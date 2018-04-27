const registerLoginMiddleware = (req, res, next) => {
  if (req.session.email) {
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = registerLoginMiddleware;