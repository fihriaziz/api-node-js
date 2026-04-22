const router = require('express').Router();
const ctrl = require('../controllers/balanceController');
const auth = require('../middleware/auth');

router.get('/balance', auth, ctrl.getBalance);
router.post('/topup', auth, ctrl.topup);

module.exports = router;
