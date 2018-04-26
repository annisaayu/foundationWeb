'use strict';

const bcrypt    = require('bcrypt');
const Sequelize = require('sequelize');
const Op        = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var Foundation = sequelize.define('Foundation', {
    foundation_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect'
        },
        isUnique(value, next) {
          // Condition for Add Foundation
          let condition = {
            email: value
          }
          // Condition for Edit Foundation
          if (this.id != null) {
            condition = {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          }

          sequelize.models.Foundation.findOne({
              where: condition
            })
            .then(emailInput => {
              if (emailInput) {
                next('Email is already exist');
              } else {
                next()
              }
            })
            .catch(err => {
              next(err);
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 50],
          msg: 'Minimum password is 8 character'
        }
      }
    },
    address: DataTypes.STRING,
    saldo: DataTypes.INTEGER
  }, {});


  Foundation.associate = function(models) {
    // associations can be defined here
    Foundation.hasMany(models.Item)
    Foundation.belongsToMany(models.User, {through: models.Item})
  };

  Foundation.hook('beforeCreate', (foundation, options) => {
    let saltRounds = 10;
    let salt       = bcrypt.genSaltSync(saltRounds);
    let hash       = bcrypt.hashSync(foundation.password, salt);

    foundation.password = hash;
  });

  return Foundation;
};
