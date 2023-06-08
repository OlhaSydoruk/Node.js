import {PostEntity} from "../../entities/PostEntity.js";

export interface IPostDao {
    getAll(): Promise<PostEntity[]>;

    getById(id: number): Promise<PostEntity | null>;

    create(postEntity: PostEntity): void;

    update(id: number, postEntity: PostEntity): void;

    delete(id: number): void;
}