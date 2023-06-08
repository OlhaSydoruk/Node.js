import {Router} from "express";
import {UserController} from "../api/controllers/User/UserController.js";
import {CreateUserRequest} from '../api/requests/User/CreateUserRequest.js'

const router: Router = Router();

const userController = new UserController();

router.get('/users', userController.indexUser.bind(userController));
router.get('/users/:id', userController.showUser.bind(userController));
router.post('/users', CreateUserRequest.rules(), userController.storeUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

export default router;

