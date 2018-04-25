const router               = require('express').Router();
const { User, Foundation } = require('../models');
const bcrypt               = require('bcrypt');

router.get('/', (req, res) => {
  res.render('login');
})

router.post('/', (req, res) => {
  if (req.body.login === 'user') {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (user) {
          let password = bcrypt.compareSync(req.body.password, user.password);

          if (password) {
            req.session.user_id = user.id;
            req.session.email   = user.email;
            
            res.redirect('/');
          } else {
            res.redirect('/login')
          }
        } else {
          res.redirect('/login');
        }
      })
      .catch(err => {
        console.log(err)
      });
  } else if (req.body.login === 'foundation') {
    Foundation
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(foundation => {
        if (foundation) {
          let password = bcrypt.compareSync(req.body.password, foundation.password);

          if (password) {
            req.session.foundation_id = foundation.id;
            req.session.email         = foundation.email;
            
            res.redirect('/');
          } else {
            res.redirect('/login')
          }
        } else {
          res.redirect('/login');
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
  
})

module.exports = router;