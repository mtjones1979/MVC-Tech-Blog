const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
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
        }]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, logged_in: req.session.logged_in });
    })
    .catch(err => {
        res.status(500).json('This didnt work!');
    });
});

router.get('/posts', (req,res) => {
    if(req.session.logged_in){
        res.render('newPost');
    }
})
router.get('/login', (req, res) => {
    
    if (req.session.logged_in) {

        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('sign-up'); 
});

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title', 'created_at'],
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
        }]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
        const post = dbPostData.get({ plain: true });
        console.log(post);
            res.render('singlePost', { post, logged_in: req.session.logged_in });
    })
    .catch(err => {
        res.status(500).json('This didnt work!');
    });
});
router.get('/comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title', 'created_at'],
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
        }]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('posts-comments', { post, logged_in: req.session.logged_in });
    })
    .catch(err => {
        res.status(500).json('This didnt work!');
    });
});

module.exports = router;