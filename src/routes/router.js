const express = require('express');

const config = require('../config');

const router = new express.Router();

router.get(['/', '/favicon.ico'], (req, res) => {

  return res.send(`Date: ${new Date()}
  Enviroment: ${config.env}`);
});

module.exports = router;
