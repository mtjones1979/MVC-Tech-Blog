// set up home and dashboard knowing I'll need from readme
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

// router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);
// 404 route in case
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;