const express = require('express');
const app = express();
const gameRoute = express.Router();
let Game = require('../model/Game');

gameRoute.route('/add-game').post((req, res, next) => {
    Game.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('Game successfully created!')
    }
  })
});

gameRoute.route('/games').get((req, res) => {
    Game.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

gameRoute.route('/read-game/:id').get((req, res) => {
    Game.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

gameRoute.route('/edit-game/:id').put((req, res, next) => {
    Game.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Game successfully updated!')
    }
  })
})

gameRoute.route('/delete-game/:id').delete((req, res, next) => {
    Game.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = gameRoute;