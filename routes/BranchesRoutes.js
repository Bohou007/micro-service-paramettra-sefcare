const express = require('express');
const router = express.Router();

//Recovery of the branch controller
const BranchesController = require('../controllers/BranchesController');

router.get('/', BranchesController.getAllBranches) // Route to Get All Branch
router.get('/:id', BranchesController.getOneBranches); // Route to Get Find One Branch
router.post('/', BranchesController.createBranches); // Route to Create Branch
router.put('/:id', BranchesController.updateBranches); // Route to Update Branch
router.put('/enable/:id', BranchesController.enableBranches); // Route to Enable Branch
router.put('/disable/:id', BranchesController.disableBranches); // Route to Disable Branch

module.exports = router;  //exports All Routes Branch