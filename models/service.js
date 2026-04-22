module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Service', {
    service_code: { 
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true 
    },
    service_name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    service_icon: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    service_tariff: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.ENUM('active', 'inactive'), 
      defaultValue: 'active' 
    }
  });
};
