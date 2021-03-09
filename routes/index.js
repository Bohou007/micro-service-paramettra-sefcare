var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('Api de gestion de paramettrage de la platforme de sunu - Module 1');
});

module.exports = router;
