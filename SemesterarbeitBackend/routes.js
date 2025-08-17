const express = require('express');
const router = express.Router();
const Pokemon = require('./models/pokemon');


router.get('/pokemon', async(req, res) => {
    const allPokemon = await Pokemon.find();
    res.send(allPokemon);
 
});

module.exports = router;