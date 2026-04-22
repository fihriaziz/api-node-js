const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const profileRoutes = require("./routes/profileRoutes");
const bannerRoutes = require('./routes/bannerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

app.use('/api', authRoutes);
app.use('/api', balanceRoutes);
app.use('/api', transactionRoutes);
app.use('/api', profileRoutes);
app.use('/api', bannerRoutes);
app.use('/api', serviceRoutes);

const { sequelize } = require('./models');

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
