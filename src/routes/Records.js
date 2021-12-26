const express = require('express');
const Records = require('../controllers/Records');
const validate = require('../middlewares/validate');
const { recordRequest } = require('../validations/Records');

const router = express.Router();

router.route('/').post(validate(recordRequest), Records.list);

module.exports = router;
