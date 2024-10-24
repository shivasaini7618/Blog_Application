const express = require('express');
const router = express.Router();

// import controller
const {createComment , commentDelete} = require('../controllers/commentController');
const {createPost , getPost , getPostById , updatePost , deletePost} = require('../controllers/postController');
const {likePost , unlikepost} = require('../controllers/likeController');



// Mapping create

// Comments
router.post('/createComment' , createComment);
router.delete('/deleteDelete' , commentDelete);
// Post
router.post('/createPost' , createPost);
router.get('/All', getPost);
router.get('/getPost/:id', getPostById);
router.put('/updatePost/:id', updatePost);
router.delete('/deletePost/:id', deletePost);

// like 
router.post('/like' , likePost);
router.post('/unlike' , unlikepost);









// export route

module.exports = router;