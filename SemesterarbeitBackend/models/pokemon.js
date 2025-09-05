const mongoose = require('mongoose');

const Pokemonschema = new mongoose.Schema({
   name: { type: String, required: true },
  level: { type: Number, required: true, min: 1, max: 100 },
  type1: { type: String, required: true },
  type2: { type: String },
  attacks: [String]
});

module.exports = mongoose.model('Pokemon', Pokemonschema);