const router = require('express').Router();
const postController = require('../controllers/postsController');

router.get('/', (req, res) => postController.getPosts(req, res));

router.post('/', (req, res) => postController.createPost(req, res));

module.exports = router;
