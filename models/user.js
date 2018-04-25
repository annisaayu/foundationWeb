'use strict';

const bcrypt    = require('bcrypt');
const Sequelize = require('sequelize');
const Op        = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect'
        },
        isUnique(value, next) {
          // Condition for Add User
          let condition = {
            email: value
          }
          // Condition for Edit User
          if (this.id != null) {
            condition = {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          }

          sequelize.models.User.findOne({
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
    saldo: DataTypes.INTEGER
  }, {});


  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Item)
    User.belongsToMany(models.Foundation, {through: models.Item})
  };
  
  User.hook('beforeSave', (user, options) => {
    let saltRounds = 10;
    let salt       = bcrypt.genSaltSync(saltRounds);
    let hash       = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  });

  return User;
};
