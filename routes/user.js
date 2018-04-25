const user = require('express').Router();
const { User, Item, Foundation } = require('../models')

user.get('/', (req, res) => {
  Item
    .findAll({
      include: [{
        model: Foundation
      }],
      where: {UserId: 1}
    })
    .then( items => {
      res.render('user/index', {items})
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

user.get('/:userid/profile', (req, res) => {
  User
    .findById(req.params.userid)
    .then(user => {
      // res.send(user)
      res.render('user/profile', {user})
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

user.post('/:userid/profile', (req, res) => {
  User
    .findById(req.params.userid)
    .then(user => {
      user
        .update(req.body, {where: {id: req.params.id}})
        .then((profile) => {
          res.redirect('/users')
        })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

// === item action ===
user.get('/:userid/items/add', ( req, res)=> {
  Foundation
    .findAll()
    .then( foundations => {
      res.render('item/add', {userId: req.params.userid, foundations})
    })
    .catch(({errors})=> {
      res.send(errors)
    })
})

user.post('/:userid/items/add', ( req, res) => {
  req.body.UserId = req.params.userid;
  req.body.status = 'available';
  Item
    .build(req.body)
    .save()
    .then((newItem) => {
      res.redirect('/users')
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

user.get('/:UserId/items/edit/:id', (req, res) => {
  Item
    .findOne({
      where: {itemCode: req.params.id}
    })
    .then(item => {
      Foundation
        .findAll()
        .then((foundations) => {
          // res.send(foundations)
          res.render('item/edit',{item, foundations})
        })
        .catch(({errors}) => {
          res.send(errors)
        })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

user.post('/:UserId/items/edit/:id', (req, res) => {
  Item
    .update({
      name: req.body.name,
      photo: req.body.photo,
      price: req.body.price,
      percentage: req.body.percentage,
      FoundationId: 2
    }, {where: {id: req.params.id}})
    .then(updatedItem => {
      // res.send(updatedItem)
      res.redirect('/users')
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})


module.exports = user
