const express = require('express');
const router = express.Router();
const cmtsController = require('../app/controllers/CmtsController');
const token = require('../utils/token');

router.get('/data', token.authenToken, cmtsController.data);
router.post('/create', token.authenToken, cmtsController.create);

module.exports = router;
