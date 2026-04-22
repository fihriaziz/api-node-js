module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Transaction', {
    user_id: DataTypes.INTEGER,
    type: DataTypes.ENUM('TOPUP','PAYMENT'),
    amount: DataTypes.DECIMAL(12,2),
    description: DataTypes.STRING
  });
};
