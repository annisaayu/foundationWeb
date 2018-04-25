const router                     = require('express').Router();
const { User, Item, Foundation } = require('../models')

router.get('/', (req, res) => {
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
      res.render('user/index', { items })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.get('/profile', (req, res) => {
  User
    .findById(req.session.user_id)
    .then(user => {
      res.render('user/profile', { user })
    })
    .catch(({ errors }) => {
      res.send(errors)
    })
})

router.post('/profile', (req, res) => {
  User
    .findById(req.params.userid)
    .then(user => {
      user
        .update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then((profile) => {
          res.redirect('/users')
        })
    })
    .catch(({ errors }) => {
      res.send(errors)
    })
})

router.get('/items/add', ( req, res)=> {
  Foundation
    .findAll()
    .then( foundations => {
      res.render('item/add', { foundations })
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
      res.redirect('/users')
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
          res.render('item/edit',{ item, foundations })
        })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

router.post('items/edit/:id', (req, res) => {
  Item
    .update({
      name        : req.body.name,
      photo       : req.body.photo,
      price       : req.body.price,
      percentage  : req.body.percentage,
      FoundationId: 2
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(updatedItem => {
      res.redirect('/users')
    })
    .catch(({ errors }) => {
      res.send(errors)
    })
})


module.exports = router;
