const router                     = require('express').Router();
const { User, Item, Foundation } = require('../models')

router.get('/', (req, res) => {
  Item
    .findAll({
      where: {
        FoundationId: req.session.foundation_id
      }
    })
    .then( items => {
      items.forEach(item => {
        item.price = Item.toRupiah(item.price);
      });

      res.render('foundations/index', { items, level: req.session.level })
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
    .then(foundation => {
      foundation
        .update(req.body, {
          where: {
            id: req.session.foundation_id
          }
        })
        .then((profile) => {
          res.redirect('/foundation')
        })
        .catch(({ errors }) => {
          Foundation
            .findById(req.session.foundation_id)
            .then( foundation => {
              res.render('foundations/profile', { foundation, level: req.session.level, errors })
            })
        })
    })
})

router.get('/items', (req, res) => {
  Item
    .findAll({
      include: [
        User
      ],
      order: [
        [
          'id', 'ASC'
        ]
      ],
      where: {
        FoundationId: req.session.foundation_id,
        status: 'sold'
      }
    })
    .then( items => {
      items.forEach(item => {
        item.price = Item.toRupiah((item.price * item.percentage) / 100);
      });

      res.render('foundations/list-item', { items, level: req.session.level })
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
      res.render('items/buy', { item, level: req.session.level });
    })
    .catch(({errors}) => {
      res.send(errors)
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
    .catch(({errors}) => {
      res.send(errors)
    })


})

module.exports = router;
