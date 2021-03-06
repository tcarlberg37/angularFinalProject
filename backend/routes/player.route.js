const express = require('express');
const app = express();
const playerRoute = express.Router();
let Player = require('../model/Player');

playerRoute.route('/add-player').post((req, res, next) => {
    Player.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('Player successfully created!')
    }
  })
});

playerRoute.route('/players').get((req, res) => {
    Player.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

playerRoute.route('/read-player/:id').get((req, res, next) => {
    Player.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

playerRoute.route('/edit-player/:id').put((req, res, next) => {
    Player.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Player successfully updated!')
    }
  })
})

playerRoute.route('/delete-player/:id').delete((req, res, next) => {
    Player.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = playerRoute;