const router = require('express').Router();
const ctrl = require('../controllers/balanceController');
const auth = require('../middleware/auth');

router.get('/balance', auth, ctrl.getBalance);
router.post('/topup', auth, ctrl.topup);
router.post('/transaction', auth, ctrl.transaction);
router.post('/transaction/history', auth, ctrl.transactionHistory);

module.exports = router;
