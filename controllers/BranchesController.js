const {Branch} = require('../models'); // To Get the model for Branch
const { Filiales } = require('../models');
const { Branch_Filiale } = require('../models');

const slug = require('slug');

// Get the fichier where is write the relation text
const relation = require('../relations/TableAssociation');
relation.branchFilialesAssociation();// get fonction

//Get All Branches save in database
exports.getAllBranches = (req, res, next) => {

    Branch.findAll({ include: [Filiales] })
        .then(data => res.status(200).json({ 'error': false, 'Branches': data}))

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Branches."
            });
        });
     
}


// Controller to Find and Show one Branches
exports.getOneBranches = (req, res, next) => {
    const id = req.params.id;

    Branch.findByPk(id, { include: [Filiales] })
        .then(data => res.status(200).json({ 'error': false, 'Branches': data, 'message': data.branch_name+' Branch was selected' }))
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Branches with id=" + id
            });
        });
}


// Controller to Create Branches
exports.createBranches = (req, res , next) => {
    if (!req.body.branch_name) { 
        res.status(400).send({
            message: "Branches Name Content can not be empty!"
        });
        return;
    }
    if (!req.body.code_branch) {
        res.status(400).send({
            message: "Code Branche Content can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).send({
            message: "Description Content can not be empty!"
        });
        return;
    }

    const branche = new Branch({
        branch_name: req.body.branch_name,
        code_branch: req.body.code_branch,
        description: req.body.description,
        slug: slug(req.body.branch_name),
        status: 1,
        created_at : Date.now(),
        updated_at : Date.now()
    });
    branche.save().then(
        () => {
            res.status(201).json({'error': false, 'message': 'Branche ' + branche.branch_name + ' was created'});
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Controller to Update Branches
exports.updateBranches = (req, res , next) => {
    let { branch_name, code_branch, description} = req.body;
    const branche_id = req.params.id;
    Branch.update({ branch_name: branch_name, code_branch: code_branch, description: description ,slug: slug(req.body.branch_name)}, 
    { where: { id: branche_id} })
        .then(data => res.status(200).json({ 'error': false,'message': 'The Branches id = '+ branche_id + ' was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}


// Controller to Enable Branches
exports.enableBranches = (req, res, next) => {
    let status = 1;
    const branches_id = req.params.id;
    Branch.update({ status: status }, 
    { where: { id: branches_id} })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Branches id = '+ branches_id + ' was enabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}


// Controller to Disable Branches
exports.disableBranches = (req, res, next) => {
    let status = 0;
    let disabledAt = Date.now();
    const branches_id = req.params.id;
    Branch.update({ status: status, disabledAt:disabledAt}, 
    { where: { id: branches_id} })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Branches id = '+ branches_id + ' was disabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}