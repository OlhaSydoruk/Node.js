import {body} from 'express-validator';
import {UserService} from "../../services/User/UserService.js";

export class CreatePostRequest {
    static rules() {
        return [
            body('title').notEmpty().withMessage('Title є обов\'язковим полем')
                .isString().withMessage('Age має бути строкою'),
            body('text').notEmpty().withMessage('Text є обов\'язковим полем')
                .isString().withMessage('Age має бути строкою'),
            body('userId').notEmpty().withMessage('UserId є обов\'язковим полем')
                .isInt().withMessage('Info має бути числом'),
        ];
    }

    static async usernameExists(username: string): Promise<void> {
        const userService = new UserService();
        if (!!await userService.getByUsername(username)) throw new Error();
    }
}