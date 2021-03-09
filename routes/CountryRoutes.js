const express = require('express');
const router = express.Router();

//Recovery of the Country controller
const CountryController = require('../controllers/CountryController');

router.get('/', CountryController.getAllCountries); // Route to Get All Country
router.get('/:id', CountryController.getOneContries); // Route to Get Find One Country
router.post('/', CountryController.createCountry); // Route to Create Country
router.put('/:id', CountryController.updateCountry); // Route to Update Country
router.put('/enable/:id', CountryController.enableCountry); // Route to Enable Country
router.put('/disable/:id', CountryController.disableCountry); // Route to Disable Country

module.exports = router; //exports All Routes Country