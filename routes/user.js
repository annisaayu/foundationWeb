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
      // res.send(items)
      res.render('user/index', {items})
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})

user.get('/:userid/add-item', ( req, res)=> {
  Foundation
    .findAll()
    .then( foundations => {
      res.render('item/add', {userId: req.params.userid, foundations})
    })
    .catch(({errors})=> {
      res.send(errors)
    })
})

user.post('/:userid/add-item', ( req, res) => {
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

user.get('/:UserId/edit-item/:id', (req, res) => {
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

user.post('/:UserId/edit-item/:id', (req, res) => {
  Item
    .findOne({
      where: {itemCode: req.params.id}
    })
    .then(item => {
      item
        .update(req.body)
        .then(updatedItem => {
          res.redirect('/users')
        })
    })
    .catch(({errors}) => {
      res.send(errors)
    })
})


module.exports = user
