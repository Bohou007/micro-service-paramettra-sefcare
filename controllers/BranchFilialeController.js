const { Filiales } = require('../models');
const { Branch } = require('../models');
const { Branch_Filiale } = require('../models');

// Get the fichier where is write the relation
const relation = require('../relations/TableAssociation');
relation.branchFilialesAssociation();// get fonction of relation branch and filiale

exports.getAllBranchFiliale = (req, res, next) => {
    
    Branch_Filiale.findAll({ include: [Branch, Filiales] })
        .then(data => res.status(200).json({ 'error': false, 'Branch Filiale': data}))

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Branch Filiale."
            });
        });
}


exports.getOneBranchFiliale = (req, res, next) => {
    const id = req.params.id;

    Branch_Filiale.findByPk(id, { include: [Branch, Filiales] })
        .then(data => res.status(200).json({ 'error': false, 'Branch & Filiales': data, 'message': data.filiale_name + ' Branch Filiale was selected' }))
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Branch Filiale with id=" + id
            });
        });
}


exports.attach = (req, res, next) => {
    let { branch_id, filiale_id } = req.body;

    let branch = Branch.findAll({ where: { id: branch_id } });
    let filiale = Filiales.findOne({ where: { id: filiale_id } });

    if (branch && filiale) {
        Branch_Filiale.create({ branch_id: branch_id, filiale_id: filiale_id })
            .then(
                () => {
                    res.status(201).json({ 'error': false, 'message': 'The Branche was attached to Filiale' });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
    } else {
        res.status(404).send("Data is not existe");
    }




}