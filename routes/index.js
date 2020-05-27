const router = require('express').Router();
const postRoutes = require('./posts');

router.use('/posts', postRoutes);
router.get('/', (req, res) => res.send('Connected'));

module.exports = router;