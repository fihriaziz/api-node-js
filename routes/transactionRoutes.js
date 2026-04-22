const router = require('express').Router();
const ctrl = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/payment', auth, ctrl.payment);
router.post('/history', auth, ctrl.transactionHistory);

module.exports = router;
