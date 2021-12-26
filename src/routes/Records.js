const express = require('express');
const Records = require('../controllers/Records');

const router = express.Router();

router.route('/').post(Records.list);

module.exports = router;
