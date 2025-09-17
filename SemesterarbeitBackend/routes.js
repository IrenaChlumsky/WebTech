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


router.get('/pokemon/:id', async (req, res) => {
  const pokemon = await Pokemon.findOne({ _id: req.params.id });
 

  if (pokemon) {
    res.send(pokemon);
  } else {
    res.status(404).send({
      error: "Pokemon does not exist!"
    });
  }
});
router.delete('/pokemon/:id', async(req, res) => {
    try {
        await Pokemon.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Pokemon does not exist!" })
    }
});
router.put('/pokemon/:id', async (req, res) => {
  try {
    const { name, level, type1, type2, attacks } = req.body;

    const updated = await Pokemon.findByIdAndUpdate(
      req.params.id,
      { name, level, type1, type2, attacks },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).send({ error: 'Pokemon does not exist!' });
    }
    res.send(updated);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: 'Update failed' });
  }
});



module.exports = router;