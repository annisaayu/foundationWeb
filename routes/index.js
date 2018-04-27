const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { level: req.session.level });
})

module.exports = router;