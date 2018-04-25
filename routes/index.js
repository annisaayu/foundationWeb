const routes = require('express').Router();
const user = require('./user.js');

routes.get('/', (req, res) => {
  res.render('home')
})

routes.use('/users', user)

module.exports = routes
