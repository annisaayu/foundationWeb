const router                     = require('express').Router();
const { User, Item, Foundation } = require('../models')

router.get('/', (req, res) => {
  Item
    .findAll({
      include: [
        Foundation
      ],
      order: [
        [
          'id', 'ASC'
        ]
      ],
      where: {
        UserId: req.session.user_id
      }
    })
    .then( items => {
      items.forEach(item => {
        item.price = Item.toRupiah(item.price);
      });

      res.render('users/index', { items, level: req.session.level  })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/profile', (req, res) => {
  User
    .findById(req.session.user_id)
    .then(user => {
      res.render('users/profile', { user, level: req.session.level})
    })
    .catch(({ errors }) => {
    })
})

router.post('/profile', (req, res) => {
  User
    .update(req.body, {
      where: {
        id: req.session.user_id
      }
    })
    .then((user) => {
      res.redirect('/user')
    })
    .catch(({ errors }) => {
      User
        .findById(req.session.user_id)
        .then(user => {
          res.render('users/profile', {user, level: req.session.level, errors })
        })
    })
})

router.get('/items', (req, res) => {
  Item
    .findAll({
      include: [
        Foundation
      ],
      order: [
        [
          'id', 'ASC'
        ]
      ],
      where: {
        UserId: req.session.user_id
      }
    })
    .then(items => {
      items.forEach(item => {
        item.price = Item.toRupiah(item.price);
      });

      res.render('users/index', { level: req.session.level, items })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/items/sold', (req, res) => {
  Item
    .findAll({
      include: [
        Foundation
      ],
      order: [
        [
          'id', 'ASC'
        ]
      ],
      where: {
        UserId: req.session.user_id
      }
    })
    .then(items => {
      items.forEach(item => {
        item.price = Item.toRupiah(item.price);
      });

      res.render('users/sold-item', { level: req.session.level, items })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/items/add', ( req, res)=> {
  Foundation
    .findAll()
    .then( foundations => {
      res.render('items/add', { foundations, level: req.session.level })
    })
    .catch(({ errors })=> {
      res.send(errors)
    })
})

router.post('/items/add', (req, res) => {
  req.body.UserId = req.session.user_id;
  req.body.status = 'available';

  Item
    .create(req.body)
    .then((newItem) => {
      res.redirect('/user')
    })
    .catch(({ errors }) => {
      res.send(errors)
    })
})

router.get('/items/edit/:id', (req, res) => {
  Item
    .findOne({
      where: {
        itemCode: req.params.id
      }
    })
    .then(item => {
      Foundation
        .findAll()
        .then((foundations) => {
          res.render('items/edit',{ item, foundations, level: req.session.level  })
        })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.post('/items/edit/:id', (req, res) => {
  Item
    .update({
      name        : req.body.name,
      photo       : req.body.photo,
      price       : req.body.price,
      percentage  : req.body.percentage,
      FoundationId: req.body.FoundationId
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(updatedItem => {
      res.redirect('/user/items')
    })
    .catch(({ errors }) => {
      Item
        .findOne({
          where: {
            itemCode: req.params.id
          }
        })
        .then(item => {
          Foundation
            .findAll()
            .then((foundations) => {
              res.render('items/edit',{ item, foundations, level: req.session.level, errors  })
            })
        })
    })
})


module.exports = router;
