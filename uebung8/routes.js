const express = require('express');
const router = express.Router();
const User = require('./models/users');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Benutzer' });
  }
});

module.exports = router;

router.post('/users', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Prüfen: Gibt es den username schon?
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username existiert bereits' });
    }

    // Prüfen: Gibt es die E-Mail schon?
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'E-Mail existiert bereits' });
    }

    // Neuen User anlegen
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    // Antwort zurückschicken
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Anlegen des Benutzers' });
  }
});

// GET /users/:name – User per username abrufen
router.get('/users/:name', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name });

    if (!user) {
      return res.status(404).json({ error: 'Benutzername existiert nicht' });
    }

    res.send(user);
  } catch (err) {
    res.status(500).json({ error: 'Serverfehler beim Abrufen des Benutzers' });
  }
});
// DELETE /users/:id – Löscht einen User anhand der _id
router.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.status(204).send(); // Erfolgreich gelöscht, aber keine Inhalte zurück
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Löschen des Benutzers' });
  }
});
// PUT /users/:id – Aktualisiert einen User anhand der _id
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.send(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Benutzers' });
  }
});



