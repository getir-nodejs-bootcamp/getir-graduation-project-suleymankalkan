const express = require('express');
const Records = require('../controllers/Records');

const router = express.Router();

router.route('/').get(Records.listAll);

module.exports = router;
