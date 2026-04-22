const { User, Transaction, Service } = require('../models');

const generateInvoiceNumber = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const sequence = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `INV${day}${month}${year}-${sequence}`;
};

const payment = async (req, res) => {
  try {
    const email = req.user.email;

    const { service_code, amount } = req.body;

    if (!service_code) {
      return res.status(400).json({
        status: 102,
        message: "Service code tidak boleh kosong",
        data: null
      });
    }

    if (!amount) {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null
      });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        status: 102,
        message: "Amount hanya boleh angka dan minimal 1",
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
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null
      });
    }

    const service = await Service.findOne({
      where: { service_code }
    });

    if (!service) {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null
      });
    }

    const userBalance = parseFloat(user.balance);
    if (userBalance < numAmount) {
      return res.status(400).json({
        status: 102,
        message: "Saldo tidak cukup",
        data: null
      });
    }

    user.balance = userBalance - numAmount;
    await user.save();

    const invoiceNumber = generateInvoiceNumber();

    await Transaction.create({
      user_id: user.id,
      type: 'PAYMENT',
      amount: numAmount,
      description: service.service_name
    });

    return res.json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: invoiceNumber,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: 'PAYMENT',
        total_amount: numAmount,
        created_on: new Date().toISOString()
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const transactionHistory = async (req, res) => {
  try {
    const email = req.user.email;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'first_name', 'last_name']
    });

    if (!user) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null
      });
    }

    const limit = req.body.limit ? parseInt(req.body.limit) : null;

    let query = {
      where: { user_id: user.id },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'type', 'amount', 'description', 'createdAt']
    };

    if (limit && limit > 0) {
      query.limit = limit;
    }

    const transactions = await Transaction.findAll(query);

    const data = transactions.map((transaction, index) => ({
      no: index + 1,
      invoice_number: `INV${transaction.id.toString().padStart(5, '0')}`,
      type: transaction.type,
      amount: parseFloat(transaction.amount),
      description: transaction.description,
      created_on: transaction.createdAt.toISOString()
    }));

    return res.json({
      status: 0,
      message: "History transaksi berhasil diambil",
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = {
  payment,
  transactionHistory
};
