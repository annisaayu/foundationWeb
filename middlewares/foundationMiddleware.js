const foundationMiddleware = (req, res, next) => {
  if (req.session.level === 'foundation') {
    next();
  } else {
    res.redirect('/user');
  }
}

module.exports = foundationMiddleware;