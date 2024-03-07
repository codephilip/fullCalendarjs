const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

//restfm
router.get('/restfm', apiController.getRestfmData);

//complete dapi
router.post('/dapi', apiController.dapi);

router.post('/dapilogin', apiController.login);
router.get('/dapidata', apiController.fetchData);
router.get('/dapilogout', apiController.logout);

module.exports = router;