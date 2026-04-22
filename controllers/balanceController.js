const { User, Transaction } = require('../models');

const getBalance = async (req, res) => {
  try {
    const email = req.user.email;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'first_name', 'last_name', 'balance']
    });

    if (!user) {
      return res.status(401).json({
        status: 108,
        message: "Unauthorized",
        data: null
      });
    }

    return res.json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: user.balance
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const topup = async (req, res) => {
  try {
    const { amount } = req.body;
    const email = req.user.email;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        status: 108,
        message: "Unauthorized",
        data: null
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        status: 102,
        message: "Jumlah top up tidak valid",
        data: null
      });
    }

    user.balance = parseFloat(user.balance) + parseFloat(amount);
    await user.save();

    await Transaction.create({
      user_id: user.id,
      type: 'TOPUP',
      amount,
      description: 'Top Up'
    });

    return res.json({
      status: 0,
      message: "Sukses",
      data: {
        balance: user.balance
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = {
  getBalance,
  topup
};
