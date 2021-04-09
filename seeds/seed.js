const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models')
const userData = require('./userSeeds.json');
const postData = require('./postSeeds.json');
const commentData = require('./commentSeeds.json');



const seedDatabase = async () => {
    await sequelize.sync ({ force: true });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
        });
    }

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
        });
    }
    process.exit(0);
};
seedDatabase();