const express = require('express');
const router = express.Router();


router.get('/', async(req, res) => {

    res.send({ message: "Hello FIW!" });
});

module.exports = router;