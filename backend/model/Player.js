const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
  player_name: {
    type: String
  },
  rank: {
    type: Number
  },
  score: {
    type: Number
  },
  time: {
    type: String
  },
  favourite_game: {
    type: String
  },
  status: {
    type: String
  }
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player)