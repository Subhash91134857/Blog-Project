import express from "express";
import { SignupUser, LoginUser } from "../Controllers/user-controllers.js";
import { uploadImage,getImage } from "../Controllers/image-controller.js";
import upload from "../utils/upload.js";
import { createPost, getAllPosts, getPost, upDatePost, deletPost } from "../Controllers/post-controller.js";
import { authenticateToken } from "../Controllers/jwt-controller.js";
import { newComment ,getAllComments,deleteComment} from "../Controllers/Comment-controller.js";


const router = express.Router();

router.post('/signup', SignupUser);
// Route for login
router.post('/login', LoginUser);
// Route for uploading file in which i have used multer middleware for storing file directly to mongoDB;
router.post('/upload', upload.single('file'), uploadImage);
//  Getting image
router.get('/file/:filename', getImage);
//
router.post('/create', authenticateToken, createPost);


router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);

router.put('/update/:id', authenticateToken, upDatePost);


router.delete('/delete/:id', authenticateToken, deletPost)


router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getAllComments);
router.delete('/comment/delete/:id',authenticateToken,deleteComment)
export default router;