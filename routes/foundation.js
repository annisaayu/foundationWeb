const router                     = require('express').Router();
const { User, Item, Foundation } = require('../models')

router.get('/', (req, res) => {
  Foundation
    .findById(req.session.foundation_id)
    .then( foundation => {
      Item
        .findAll({
          where: {
            FoundationId: req.session.foundation_id
          }
        })
        .then( items => {
          res.render('foundations/index', { items, foundation, level: req.session.level })
        })
    })

    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/profile', (req, res) => {

  Foundation
    .findById(req.session.foundation_id)
    .then( foundation => {
      res.render('foundations/profile', { foundation, level: req.session.level })
    })

    .catch(({errors}) => {
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
  Foundation
    .findById(req.session.foundation_id)
    .then( foundation => {
      Item
        .findAll({
          where: {
            FoundationId: req.session.foundation_id,
            status: 'sold'
          }
        })
        .then( items => {
          res.render('foundations/list-item', { items, foundation, level: req.session.level })
        })
    })

    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/items/buy/:id', (req, res) => {
  Foundation
    .findById(req.session.foundation_id)
    .then( foundation => {
      Item
        .findOne({
          where:{
            itemCode: req.params.id
          }
        })
        .then(item => {
          res.render('items/buy', { item, foundation, level: req.session.level });
        })
    })
    .catch(({errors}) => {
      res.send(errors)
    })

})

router.post('/items/buy/:id', (req, res) => {
  Foundation
    .findById(req.session.foundation_id)
    .then( foundation => {
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
    })
    .catch(({errors}) => {
      res.send(errors)
    })


})

module.exports = router;
