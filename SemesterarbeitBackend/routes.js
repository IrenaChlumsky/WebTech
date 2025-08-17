const express = require('express');
const router = express.Router();
const Pokemon = require('./models/pokemon');


router.get('/pokemon', async(req, res) => {
    const allPokemon = await Pokemon.find();
    res.send(allPokemon);
 
});
router.post('/pokemon', async(req, res) => {
    const newPokemon = new Pokemon({
        name: req.body.name,
        level: req.body.level,
        type1: req.body.type1,
        type2: req.body.type2,
        attacks: req.body.attacks
    });
    await newPokemon.save();
    res.send(newPokemon);
});


module.exports = router;