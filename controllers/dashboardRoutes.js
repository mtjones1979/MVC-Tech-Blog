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
        },
        {
            model: User,
            attributes: ['username'] 
        }],
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('dashboard', { posts, logged_in: true });
    })
    .catch(err => {res.status(500).json('This didnt work!');
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
        res.render('editPost', { post, logged_in: true });
    })
    .catch(err => {res.status(500).json('This didnt work!')});
})

router.get('/new', (req,res) => {
    res.render('newPost');
});
// router.post('/new', withAuth, (req, res) => {
//     console.log(res.session.user_id);
//     console.log(req.body);
//     Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       user_id: req.session.user_id
//     })
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => {res.status(500).json(err)});
// });

module.exports = router;


