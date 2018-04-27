const router               = require('express').Router();
const { User, Foundation } = require('../models');

router.get('/', (req, res) => {
  res.render('register');
})

router.post('/', (req, res) => {
  if (req.body.register === 'user') {
    User
      .create({
        name    : req.body.name,
        email   : req.body.email,
        password: req.body.password
      })
      .then(user => [
        res.redirect('/login')
      ])
      .catch(({ errors }) => {
        res.render('register', { errors });
      })
  } else if (req.body.register === 'foundation') {
    Foundation
      .create({
        foundation_name: req.body.name,
        email          : req.body.email,
        password       : req.body.password
      })
      .then(foundation => [
        res.redirect('/login')
      ])
      .catch(({ errors }) => {
        res.render('register', { errors });
      })
  }
  
})

module.exports = router;