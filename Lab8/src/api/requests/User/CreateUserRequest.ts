import {body} from 'express-validator';
import {UserService} from "../../services/User/UserService.js";

export class CreateUserRequest {
    static rules() {
        return [
            body('username').notEmpty().withMessage('Username є обов\'язковим полем')
                .custom((value) => this.usernameExists(value)).withMessage('Даний username вже було використано'),
            body('email').notEmpty().withMessage('Email є обов\'язковим полем')
                .isEmail().withMessage('Email є некоректним'),
            body('age').notEmpty().withMessage('Age є обов\'язковим полем')
                .isInt().withMessage('Age має бути числом'),
            body('info').notEmpty().withMessage('Info є обов\'язковим полем')
                .isString().withMessage('Info має бути строкою'),
        ];
    }

    static async usernameExists(username: string): Promise<void> {
        const userService = new UserService();
        if (!!await userService.getByUsername(username)) throw new Error();
    }
}