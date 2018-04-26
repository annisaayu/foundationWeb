const foundationMiddleware = (req, res, next) => {
  if (req.session.level === 'foundation') {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = foundationMiddleware;