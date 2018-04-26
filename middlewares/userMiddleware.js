const userMiddleware = (req, res, next) => {
  if (req.session.level === 'user') {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = userMiddleware;