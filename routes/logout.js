const router               = require('express').Router();

router.get('/', (req, res) => {
  delete req.session.user_id;
  delete req.session.foundation_id;
  delete req.session.email;

  res.redirect('/login')
})

module.exports = router;
