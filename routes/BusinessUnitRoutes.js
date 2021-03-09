const express = require('express');
const router = express.Router();

//Recovery of the Business Unit controller
const BusinesUnitController = require('../controllers/BusinessUnitController');

router.get('/', BusinesUnitController.getAllBusinnesUnits); // Route to Get All Business Unit
router.get('/:id', BusinesUnitController.getOneBusinnesUnits); // Route to Get Find One Business Unit
router.post('/', BusinesUnitController.createBusinnesUnits); // Route to Create Business Unit
router.put('/:id', BusinesUnitController.updateBusinnesUnits); // Route to Update Business Unit
router.put('/enable/:id', BusinesUnitController.enableBusinnesUnits); // Route to Enable Business Unit
router.put('/disable/:id', BusinesUnitController.disableBusinnesUnits); // Route to Disable Business Unit

module.exports = router; //exports All Routes Business Unit