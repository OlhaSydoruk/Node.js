import {users} from "../data/users"
import {Request, Response} from "express";
import {body, validationResult} from 'express-validator'
import {IUser} from "../models/user";
import {toString} from "express-validator/src/utils";

export const indexUser = (req: Request, res:Response)=>{
return res.json(users);
}
export const createUser = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    const id: string = `${users[users.length - 1].id + 1}+${req.body.name}`;
    const { name, surname, age } = req.body;
    const newUser: IUser = { id, name, surname, age };
    users.push(newUser);
    return res.json({
        status: true,
        message: `User has been created`
    }).status(201);
};
export const deleteUser = (req: Request, res: Response) => {
    const id = toString(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.json({
            status: false,
            message: `User with id ${id} not found`
        }).status(404);
    }
    users.splice(userIndex, 1);

    return res.json({
        status: true,
        message: `User has been deleted`
    }).status(204)};

export const updateUser = (req: Request, res: Response) => {
    const id: string = toString(req.params.id);
    const {name,surname, age} = req.body;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.json({
            status: false,
            message: `User with id ${id} not found`
        }).status(404);
    }

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (age) user.age = age;

    return res.json({
        status: true,
        message: `User has been updated`
    }).status(200);
}

export const showUser = (req: Request, res: Response) => {
    const id: string = toString(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.json({
            status: false,
            message: `User with id ${id} not found`
        }).status(404);
    }

    return res.json(user);
}
