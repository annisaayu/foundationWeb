const router               = require('express').Router();

router.get('/', (req, res) => {
  delete req.session.user_id;
  delete req.session.foundation_id;
  delete req.session.email;
  delete req.session.level;

  res.redirect('/login')
})

module.exports = router;