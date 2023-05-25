import {Router} from "express";
import {deleteUser, createUser, indexUser, showUser, updateUser} from "../application/controllers/userController";
import {CreateUserRequest} from "../application/requests/create.user.request";


const router: Router =Router();
router.get('/users', indexUser);
router.get('/users/:id', showUser);
router.post('/users', CreateUserRequest.rules(), createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
export default router;