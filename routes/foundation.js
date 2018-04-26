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
      where: {
        FoundationId: req.session.foundation_id
      }
    })
    .then(items => {
      res.render('foundations/index', { items })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/items/buy/:id', (req, res) => {
  Item
    .findOne({
      where:{
        itemCode: req.params.id
      }
    })
    .then(item => {
      res.render('items/buy', { item });
    })
    .catch(err => {
      res.send(err);
    })
})

router.post('/items/buy/:id', (req, res) => {
  Item
    .update({
      status: 'sold'
    }, {
      where: {
        itemCode: req.params.id
      },
      individualHooks: true
    })
    .then(updateItem => {
      res.redirect('/foundation/items')
    })
    .catch()
})

module.exports = router;