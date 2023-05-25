import {body} from 'express-validator';

export class CreateUserRequest {
    static rules() {
        return [
            body('name').isString().notEmpty().withMessage('Username is required'),
            body('surname').isString().isLength({ min: 2, max: 50 }),
            body('age').isInt({ min: 18 })
        ];
    }
}