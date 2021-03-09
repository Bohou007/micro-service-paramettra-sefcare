const express = require('express');
const router = express.Router();

//Recovery of the filiale controller
const FilialeController = require('../controllers/FilialeController');

router.get('/', FilialeController.getAllFiliale); // Route to Get All filiales
router.get('/:id', FilialeController.getOneFiliale); // Route to Get Find One Filiale
router.post('/', FilialeController.createFiliale); // Route to Create Filiale
router.put('/:id', FilialeController.updateFiliale); // Route to Update Filiale
router.put('/enable/:id', FilialeController.enableFiliale); // Route to Enable Filiale
router.put('/disable/:id', FilialeController.disableFiliale); // Route to Disable Filiale

module.exports = router; //exports All Routes Filiales