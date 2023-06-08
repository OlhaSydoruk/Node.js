import {PostRepository} from "../../../database/repositories/PostRepository.js";
import {Post} from "../../models/Post.js";

export class PostService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async getAll(): Promise<Post[]> {
        return await this.postRepository.getAll();
    }

    async get(id: number): Promise<Post | null> {
        return await this.postRepository.get(id);
    }

    async create(post: Post): Promise<void> {
        return await this.postRepository.create(post);
    }

    async update(id: number, post: Post): Promise<void> {
        return await this.postRepository.update(id, post);
    }

    delete(id: number): void {
        return this.postRepository.delete(id);
    }
}