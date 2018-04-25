'use strict';
module.exports = (sequelize, DataTypes) => {
  var Foundation = sequelize.define('Foundation', {
    foundation_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    saldo: DataTypes.INTEGER
  }, {});


  Foundation.associate = function(models) {
    // associations can be defined here
    Foundation.hasMany(models.Item)
    Foundation.belongsToMany(models.User, {through: models.Item})
  };
  return Foundation;
};
