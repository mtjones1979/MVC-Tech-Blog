// used layout from mini project had to adjust a bit
const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
  console.log(req);
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    })
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.password = userData.password;
      req.session.logged_in = true;
    res.status(200).json(userData);
    });
  } catch (err) {
      console.log('This didnt work');
      res.status(400).json(err);
    };
});
router.post('/login', async (req, res) => {
  User.findOne({ 
    where: { username: req.body.username } 
  }).then(userData => {
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      res.json({ user: userData, message: 'You are logged in!' });
    });
  })
    .catch (err => {
      console.log('This didnt work!');
    res.status(400).json(err);
    })
});


router.post('/logout', (req, res) => {
if (req.session.logged_in) {
  req.session.destroy(() => {
    res.status(204).end();
  });
} else {
  res.status(404).end();
}
});


module.exports = router;