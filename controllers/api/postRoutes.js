//used user as layout and adjusted to Post needs
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes:['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {res.status(500).json('This didnt work!')});
});


router.post('/', async (req,res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err)
    }
})
router.put('/:id', withAuth, (req, res) => {
    Post.update(
    {
        title: req.body.title,
        content: req.body.content
    }, 
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData[0]) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
        res.json(dbPostData);
    })
    .catch(err => {res.status(500).json(err)});
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {res.status(500).json('This didnt work!')});
});

module.exports = router;