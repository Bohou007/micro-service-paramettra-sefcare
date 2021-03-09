const express = require('express');
const router = express.Router();

//Recovery of the branch controller
const BranchFilialeController = require('../controllers/BranchFilialeController');

router.get('/', BranchFilialeController.getAllBranchFiliale) // Route to Get All Branch & Filiale
router.get('/:id', BranchFilialeController.getOneBranchFiliale) // Route to Get One Branch & Filiale
router.post('/', BranchFilialeController.attach) // Route to Attach Branch & Filiale

module.exports = router;  //exports All Routes Branch & Filiale