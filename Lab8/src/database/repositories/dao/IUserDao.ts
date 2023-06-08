import {UserEntity} from "../../entities/UserEntity.js";

export interface IUserDao {
    getAll(filters?: { age?: number, city?: string, title?: string, page?: number }): Promise<UserEntity[]>;

    getById(id: number): Promise<UserEntity | null>;

    getByUsername(username: string): Promise<UserEntity | null>;

    create(user: UserEntity): void;

    update(id: number, user: UserEntity): void;

    delete(id: number): void;
}