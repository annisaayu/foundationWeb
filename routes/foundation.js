const router                     = require('express').Router();
const { User, Item, Foundation } = require('../models')

router.get('/profile', (req, res) => {
  Foundation
    .findById(req.session.foundation_id)
    .then(foundation => {
      res.render('foundations/profile', { foundation })
    })
    .catch(({ errors }) => {
      res.send(errors)
    })
})

router.post('/profile', (req, res) => {
  Foundation
    .findById(req.session.foundation_id)
    .then(user => {
      user
        .update(req.body, {
          where: {
            id: req.session.foundation_id
          }
        })
        .then((profile) => {
          res.redirect('/foundation')
        })
    })
    .catch(({ errors }) => {
      res.send(errors)
    })
})

router.get('/items', (req, res) => {
  Item
    .findAll({
      include: [{
        model: Foundation
      }],
      where: {
        UserId: req.session.user_id
      }
    })
    .then(items => {
      res.render('users/index', { items })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/items/add', ( req, res)=> {
  Foundation
    .findAll()
    .then( foundations => {
      res.render('items/add', { foundations })
    })
    .catch(({ errors })=> {
      res.send(errors)
    })
})

module.exports = router;