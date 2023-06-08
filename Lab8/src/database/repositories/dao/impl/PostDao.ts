import {AppDataSource} from "../../../data-source.js";
import {PostEntity} from "../../../entities/PostEntity.js";
import {IPostDao} from "../IPostDao.js";
import {Repository} from "typeorm";

export class PostDao implements IPostDao {
    postEntityRepository: Repository<PostEntity> = AppDataSource.getRepository(PostEntity);

    async getAll(): Promise<PostEntity[]> {
        return await this.postEntityRepository.find({relations: ['user']});
    }

    async getById(id: number): Promise<PostEntity | null> {
        return await this.postEntityRepository.findOne({
            where: {
                id: id
            },
            relations: ['user']
        });
    }

    async update(id: number, postEntity: PostEntity): Promise<void> {
        await this.postEntityRepository.update(id, postEntity);
    }

    async create(postEntity: PostEntity): Promise<void> {
        await this.postEntityRepository.save(postEntity);
    }

    async delete(id: number): Promise<void> {
        await this.postEntityRepository.delete(id);
    }
}