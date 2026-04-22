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
    const email = req.user.email;

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        status: 102,
        message: "Jumlah top up tidak boleh kosong",
        data: null
      });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        status: 102,
        message: "Jumlah top up hanya boleh angka dan minimal 1",
        data: null
      });
    }

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'first_name', 'last_name', 'balance']
    });

    if (!user) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluarsa",
        data: null
      });
    }

    const oldBalance = parseFloat(user.balance);
    user.balance = oldBalance + numAmount;
    await user.save();

    await Transaction.create({
      user_id: user.id,
      type: 'TOPUP',
      amount: numAmount,
      description: 'Top Up Balance'
    });

    return res.json({
      status: 0,
      message: "Top Up Balance berhasil",
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
