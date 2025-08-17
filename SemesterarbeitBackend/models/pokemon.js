const mongoose = require('mongoose');

const Pokemonschema = new mongoose.Schema({
    name: String,
    level: String,
    type1: String,
    type2: String,
    attacks: [String],
});

module.exports = mongoose.model('Pokemon', Pokemonschema);