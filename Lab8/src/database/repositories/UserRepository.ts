import {User} from "../../api/models/User.js";
import {DaoFactory} from "./dao/impl/DaoFactory.js";
import {IDaoFactory} from "./dao/IDaoFactory.js";
import {UserEntity} from "../entities/UserEntity.js";

export class UserRepository {
    private daoFactory: IDaoFactory;

    constructor() {
        this.daoFactory = new DaoFactory();
    }

    public async getAll(filters?: { age?: number, city?: string, title?: string, page?: number }): Promise<User[]> {
        return (await this.daoFactory.getUserDao().getAll(filters))
            .map((userEntity) => UserRepository.mapUserEntityToUser(userEntity))
    }

    public async get(id: number): Promise<User | null> {
        const user = await this.daoFactory.getUserDao().getById(id);
        return user ? UserRepository.mapUserEntityToUser(user) : null;
    }

    public async getByUsername(username: string): Promise<User | null> {
        const user = await this.daoFactory.getUserDao().getByUsername(username);
        return user ? UserRepository.mapUserEntityToUser(user) : null
    }

    public create(user: User): void {
        this.daoFactory.getUserDao().create(UserRepository.mapUserToUserEntity(user));
    }

    public update(id: number, user: User): void {
        this.daoFactory.getUserDao().update(id, UserRepository.mapUserToUserEntity(user));
    }

    public delete(id: number): void {
        this.daoFactory.getUserDao().delete(id);
    }

    public static mapUserToUserEntity(user?: User): UserEntity {
        return <UserEntity>{
            id: user?.id,
            username: user?.username,
            email: user?.email,
            age: user?.age,
            info: <string>user?.info,
            address: {
                city: user?.address.city || '',
                street: user?.address.street || '',
            }
        }
    }

    public static mapUserEntityToUser(userEntity?: UserEntity): User {
        return <User>{
            id: userEntity?.id,
            username: userEntity?.username,
            email: userEntity?.email,
            age: userEntity?.age,
            info: userEntity?.info,
            address: userEntity?.address
        };
    }
}