'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Foundations', [{
      foundation_name: 'Yayasan Bunda Kandung',
      email: 'bundakandung@gmail.com',
      password: '1234',
      address: 'Jalan Gagak No4',
      saldo: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      foundation_name: 'Yayasan Cinta Kasih',
      email: 'cintakasih@gmail.com',
      password: '1234',
      address: 'Jalan Delima No4',
      saldo: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
