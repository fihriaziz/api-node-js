const router = require('express').Router();
const ctrl = require('../controllers/serviceController');

router.get('/services', ctrl.getServices);

module.exports = router;
