import {UserRepository} from "../../../database/repositories/UserRepository.js";
import {User} from "../../models/User.js";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll(filters?: { age?: number, city?: string, title?: string, page?: number }): Promise<User[]> {
        return await this.userRepository.getAll(filters);
    }

    async get(id: number): Promise<User | null> {
        return await this.userRepository.get(id);
    }

    async getByUsername(username: string): Promise<User | null> {
        return await this.userRepository.getByUsername(username);
    }

    create(user: User): void {
        this.userRepository.create(user);
    }

    update(id: number, user: User): void {
        this.userRepository.update(id, user);
    }

    delete(id: number): void {
        this.userRepository.delete(id);
    }
}