const router = require('express').Router();
const ctrl = require('../controllers/bannerController');

router.get('/banners', ctrl.getBanner);

module.exports = router;
