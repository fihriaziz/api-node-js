module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    profile_image: { type: DataTypes.STRING },
  });
};
