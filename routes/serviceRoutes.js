const router = require('express').Router();
const ctrl = require('../controllers/serviceController');
const auth = require('../middleware/auth');

router.get('/services', auth, ctrl.getServices);

module.exports = router;
