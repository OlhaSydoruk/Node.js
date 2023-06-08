import {Request, Response} from "express";
import {validationResult} from 'express-validator';
import {UserService} from "../../services/User/UserService.js";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async indexUser(req: Request, res: Response) {
        const {age, city, title, page} = req.query;

        const filters = {
            age: age ? parseInt(age as string, 10) : undefined,
            city: city ? city as string : undefined,
            title: title ? title as string : undefined,
            page: page ? parseInt(page as string, 10) : undefined,
        };

        return res.json(await this.userService.getAll(filters));
    }

    async showUser(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const user = await this.userService.get(id);

        if (!user) {
            return res.json({
                status: false,
                message: `User with id ${id} not found`
            }).status(404);
        }

        return res.json(user);
    }

    async storeUser(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                errors: errors.array()
            }).status(400);
        }

        await this.userService.create(req.body);

        return res.json({
            status: true,
            message: `Успішно створено`
        }).status(201);
    };

    async updateUser(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const user = await this.userService.get(id);

        if (!user) {
            return res.json({
                status: false,
                message: `Користувача з id ${id} не знайдено`
            }).status(404);
        }

        await this.userService.update(id, req.body);

        return res.json({
            status: true,
            message: `Успішно оновлено`
        }).status(200);
    }

    async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = await this.userService.get(id);

        if (!user) {
            return res.json({
                status: false,
                message: `Користувача з id ${id} не знайдено`
            }).status(404);
        }

        await this.userService.delete(id);

        return res.json({
            status: true,
            message: `Успішно видалено`
        }).status(204);
    }
}

