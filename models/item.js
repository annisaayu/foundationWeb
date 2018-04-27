'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    price: DataTypes.INTEGER,
    percentage: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    FoundationId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    itemCode: DataTypes.INTEGER
  }, {});


  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Foundation)
    Item.belongsTo(models.User)
  };

  Item.hook('afterUpdate', (item, options) => {
    if (item.status === 'sold') {
      let saldoFoundation = (item.price * item.percentage) / 100;
      let saldoUser       = item.price - saldoFoundation;

      sequelize.models.User
        .update({
          saldo: saldoUser
        }, {
          where: {
            id: item.UserId
          }
        })
        .then(data => {
          sequelize.models.Foundation
            .update({
              saldo: saldoFoundation
            }, {
              where: {
                id: item.FoundationId
              }
            })
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
  return Item;
};
