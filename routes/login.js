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
            req.session.level   = 'user';

            res.redirect('/user');
          } else {
            res.render('login', { errors: [{message: 'Incorrect Email / Password Combination'}] });
          }
        } else {
          res.render('login', { errors: [{message: 'Incorrect Email / Password Combination'}] });
        }
      })
      .catch(({ errors }) => {
        res.send(errors);
      })

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
            req.session.level         = 'foundation';

            res.redirect('/foundation');
          } else {
            res.render('login', { errors: [{message: 'Incorrect Email / Password Combination'}] });
          }
        } else {
<<<<<<< HEAD
          res.render('login', { errors: [{message: 'Incorrect Email / Password Combination'}] });
=======
          res.render('login', { errors: [{message: 'Incorrect Email / Password Combination'}] });;
>>>>>>> 1f2d3dcab5d1000cea455fa8a89720759ba529c4
        }
      })
      .catch(({ errors }) => {
        res.render('login', { errors });
      })
  }

})

module.exports = router;
