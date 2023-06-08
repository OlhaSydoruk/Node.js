import {IUserDao} from "../IUserDao.js";
import {IPostDao} from "../IPostDao.js";
import {UserDao} from "./UserDao.js";
import {PostDao} from "./PostDao.js";
import {IDaoFactory} from "../IDaoFactory.js";

export class DaoFactory implements IDaoFactory {
    private userDao: IUserDao;
    private postDao: IPostDao;

    constructor() {
        this.userDao = new UserDao();
        this.postDao = new PostDao();
    }

    public getUserDao(): IUserDao {
        return this.userDao;
    }

    public getPostDao(): IPostDao {
        return this.postDao;
    }
}