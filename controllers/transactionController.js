const { User, Transaction } = require('../models');

exports.payment = async (req, res) => {
  const { amount, description } = req.body;
  const user = await User.findByPk(req.user.id);

  if (parseFloat(user.balance) < amount) {
    return res.status(400).json({ message: 'Saldo tidak cukup' });
  }

  user.balance -= amount;
  await user.save();

  await Transaction.create({
    user_id: user.id,
    type: 'PAYMENT',
    amount,
    description
  });

  res.json({ message: 'Payment success' });
};
