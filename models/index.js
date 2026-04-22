const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Transaction = require('./transaction')(sequelize, Sequelize);
db.Banner = require('./banner')(sequelize, Sequelize);
db.Service = require('./service')(sequelize, Sequelize);

db.User.hasMany(db.Transaction, { foreignKey: 'user_id' });
db.Transaction.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
