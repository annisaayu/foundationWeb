const router               = require('express').Router();
const { User, Foundation } = require('../models');

router.get('/', (req, res, next) => {
  delete req.session.user_id;
  delete req.session.foundation_id;
  delete req.session.email;

  res.redirect('/login')
})

module.exports = router;