'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.INTEGER
  }, {});


  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Item)
    User.belongsToMany(models.Foundation, {through: models.Item})
  };
  return User;
};
