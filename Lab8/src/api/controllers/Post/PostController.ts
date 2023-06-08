import {PostService} from "../../services/Post/PostService.js";
import {Request, Response} from "express";
import {validationResult} from 'express-validator';
import {UserService} from "../../services/User/UserService.js";

export class PostController {
    private userService: UserService;
    private postService: PostService;

    constructor() {
        this.userService = new UserService();
        this.postService = new PostService();
    }

    async indexPost(req: Request, res: Response) {
        return res.json(await this.postService.getAll());
    }

    async showPost(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const post = await this.postService.get(id);

        if (!post) {
            return res.json({
                status: false,
                message: `Публікації з id ${id} не знайдено`
            }).status(404);
        }

        return res.json(post);
    }

    async storePost(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                errors: errors.array()
            }).status(400);
        }

        const {userId} = req.body;
        if (!await this.userService.get(userId)) {
            return res.json({
                success: false,
                message: `Користувача з id ${userId} не знайдено`
            }).status(404);
        }

        await this.postService.create(req.body);

        return res.json({
            status: true,
            message: `Успішно створено`
        }).status(201);
    };

    async updatePost(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const post = await this.postService.get(id);

        if (!post) {
            return res.json({
                status: false,
                message: `Публікації з id ${id} не знайдено`
            }).status(404);
        }

        const {userId} = req.body;
        if (!await this.userService.get(userId)) {
            return res.json({
                success: false,
                message: `Користувача з id ${id} не знайдено`
            }).status(404);
        }

        await this.postService.update(id, req.body);

        return res.json({
            status: true,
            message: `Успішно оновлено`
        }).status(200);
    }

    async deletePost(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const post = await this.postService.get(id);

        if (!post) {
            return res.json({
                status: false,
                message: `Публікації з id ${id} не знайдено`
            }).status(404);
        }

        await this.postService.delete(id);

        return res.json({
            status: true,
            message: `Успішно видалено`
        }).status(204);
    }
}

