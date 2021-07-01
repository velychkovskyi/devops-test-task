const express = require('express');
const {
  handleErrorAsync,
} = require('../../../middlewares');

const router = new express.Router();

router.post(
  '/',
  handleErrorAsync(require('./post')),
);

module.exports = router;
