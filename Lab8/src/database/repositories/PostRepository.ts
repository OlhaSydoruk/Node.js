import {Post} from "../../api/models/Post.js";
import {IDaoFactory} from "./dao/IDaoFactory.js";
import {DaoFactory} from "./dao/impl/DaoFactory.js";
import {PostEntity} from "../entities/PostEntity.js";


export class PostRepository {
    private daoFactory: IDaoFactory;

    constructor() {
        this.daoFactory = new DaoFactory();
    }

    public async getAll(): Promise<Post[]> {
        return (await this.daoFactory.getPostDao().getAll())
            .map((userEntity) => this.mapPostEntityToPost(userEntity));
    }

    public async get(id: number): Promise<Post | null> {
        const post = await this.daoFactory.getPostDao().getById(id);
        return post ? this.mapPostEntityToPost(post) : null;
    }

    public async create(post: Post): Promise<void> {
        this.daoFactory.getPostDao().create(await this.mapPostToPostEntity(post));
    }

    public async update(id: number, post: Post): Promise<void> {
        this.daoFactory.getPostDao().update(id, await this.mapPostToPostEntity(post));
    }

    public delete(id: number): void {
        this.daoFactory.getPostDao().delete(id);
    }

    private mapPostEntityToPost(postEntity?: PostEntity): Post {
        return <Post>{
            id: postEntity?.id,
            dateCreation: postEntity?.dateCreation,
            title: postEntity?.title,
            text: postEntity?.text,
            userId: postEntity?.user.id
        }
    }

    private async mapPostToPostEntity(post: Post): Promise<PostEntity> {
        return <PostEntity>{
            id: post?.id,
            dateCreation: post?.dateCreation,
            title: post?.title,
            text: post?.text,
            user: await this.daoFactory.getUserDao().getById(post.userId)
        }
    }
}