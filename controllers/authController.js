const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.register = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null
    });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    await User.create({ email, first_name, last_name, password: hash, profile_image: null });
    res.status(200).json({ 
      status: 0,
      message: 'Registrasi berhasil silahkan login',
      data: null
    });
  } catch (err) {
    res.status(400).json({ 
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ 
    status: 103,
    message: 'Username atau password salah',
    data: null 
  });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ 
    status: 103,
    message: 'Username atau password salah',
    data: null 
  });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.status(200).json({ 
    status: 0,
    message: "Login sukses",
    data: {
      "token": token
    }
  });
};
