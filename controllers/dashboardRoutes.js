// similar layout to activity 24 with the map of data
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
           include: {
               model: User, 
               attributes: ['username']
            }
        }],
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('dashboard', { posts, logged_in: req.session.logged_in });
    })
    .catch(err => {res.status(500).json('This didnt work!');
    });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
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
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({alert: 'No post found with this id'});
            return;
        }
        const post = dbPostData.get({ plain: true});
        res.render('editPost', { post, logged_in: req.session.logged_in });
    })
    .catch(err => {res.status(500).json('This didnt work!')});
})

module.exports = router;


