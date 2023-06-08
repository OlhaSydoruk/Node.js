import {IUserDao} from "../IUserDao.js";
import {AppDataSource} from "../../../data-source.js";
import {UserEntity} from "../../../entities/UserEntity.js";
import {Repository} from "typeorm";

export class UserDao implements IUserDao {
    userEntityRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

    async getAll(filters: { age?: number, city?: string, title?: string, page?: number } = {}): Promise<UserEntity[]> {
        const {age, city, title, page = 1} = filters;
        const limit = 10;

        const query = this.userEntityRepository.createQueryBuilder('user');

        if (age) {
            query.andWhere('user.age = :age', {age});
        }
        if (city) {
            query.andWhere(`user.address ->> 'city' = :city`, {city});
        }
        if (title) {
            query.andWhere(subQuery => {
                const subQueryAlias = subQuery.subQuery()
                    .select('post.userId')
                    .from('posts', 'post')
                    .where('post.title = :title', {title})
                    .getQuery();

                return 'user.id IN ' + subQueryAlias;
            })
        }

        const pageNumber = page || 1;
        const pageSize = limit || 10;
        const skip = (pageNumber - 1) * pageSize;
        const take = pageSize;

        query.skip(skip);
        query.take(take);

        return await query.getMany();
    }

    async getById(id: number): Promise<UserEntity | null> {
        return await this.userEntityRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getByUsername(username: string): Promise<UserEntity | null> {
        return await this.userEntityRepository.findOne({
            where: {
                username: username
            }
        });
    }

    async update(id: number, userEntity: UserEntity): Promise<void> {
        await this.userEntityRepository.update(id, userEntity);
    }

    async create(userEntity: UserEntity): Promise<void> {
        await this.userEntityRepository.save(userEntity);
    }

    async delete(id: number): Promise<void> {
        await this.userEntityRepository.delete(id);
    }
}