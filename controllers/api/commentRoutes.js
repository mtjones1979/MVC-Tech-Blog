const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const commentData = Comment.findAll({ 
            attributes: ['comment_text'],
            // include: [{
            //     model: User,
            //     attributes: ['username']
            // }],
        });
        res.status(200).json(commentData);
        } catch(err) {
            res.status(500).json(err);
        }
    });

router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id:req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {res.status(500).json(err)})
});

router.post('/', async (req, res) => {
    try{
        const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        // post_id: req.body.post_id,
        user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
    }
    catch (err) { {res.status(500).json('This didnt work!')}
    }
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({alert: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {res.status(500).json('This didnt work!')})
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy ({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({alert: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {res.status(500).json('This didnt work!')});
});
module.exports = router;


