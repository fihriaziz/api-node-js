const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Profile', {
        email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        profile_image : DataTypes.STRING
  });
} 