const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const postComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(postComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;