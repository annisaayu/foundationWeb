const userMiddleware = (req, res, next) => {
  if (req.session.level === 'user') {
    next();
  } else {
    res.redirect('/foundation');
  }
}

module.exports = userMiddleware;