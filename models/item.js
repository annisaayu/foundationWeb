'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    price: DataTypes.INTEGER,
    percentage: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    FoundationId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});


  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Foundation)
    Item.belongsTo(models.User)
  };
  return Item;
};
