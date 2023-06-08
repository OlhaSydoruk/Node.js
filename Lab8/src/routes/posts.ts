import {Router} from "express";
import {PostController} from "../api/controllers/Post/PostController.js";
import {CreatePostRequest} from "../api/requests/Post/CreatePostRequest.js";

const router: Router = Router();

const postController = new PostController();

router.get('/posts', postController.indexPost.bind(postController));
router.get('/posts/:id', postController.showPost.bind(postController));
router.post('/posts', CreatePostRequest.rules(), postController.storePost.bind(postController));
router.put('/posts/:id', postController.updatePost.bind(postController));
router.delete('/posts/:id', postController.deletePost.bind(postController));

export default router;

