import {IUserDao} from "./IUserDao.js";
import {IPostDao} from "./IPostDao.js";

export interface IDaoFactory {
    getUserDao(): IUserDao;

    getPostDao(): IPostDao;
}