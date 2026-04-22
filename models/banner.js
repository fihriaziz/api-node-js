module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Banner', {
    banner_name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    banner_image: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT 
    },
    status: { 
      type: DataTypes.ENUM('active', 'inactive'), 
      defaultValue: 'active' 
    }
  });
};
