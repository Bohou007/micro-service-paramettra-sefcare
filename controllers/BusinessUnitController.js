const { Business_unit } = require('../models'); // Models Business Unit Import 
const { Filiales } = require('../models'); // To Get the model for Filiales

const slug = require('slug');

//Get All Business Unit save in database
exports.getAllBusinnesUnits = (req, res, next) => {

    Filiales.belongsTo(Business_unit, {
        foreignKey: 'business_unitId'
    });
    Business_unit.hasMany(Filiales, {
        foreignKey: 'business_unitId'
    });
    Business_unit.findAll({ include: [Filiales] })
        .then(data => res.status(200).json({ 'error': false, 'Business_units': data }))

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Business units."
            });
        });
}
// Controller to Find and Show one Business Units 
exports.getOneBusinnesUnits = (req, res, next) => {
    Filiales.belongsTo(Business_unit, {
        foreignKey: 'business_unitId'
    });
    Business_unit.hasMany(Filiales, {
        foreignKey: 'business_unitId'
    });

    const id = req.params.id;

    Business_unit.findByPk(id, { include: [Filiales] })
        .then(data => res.status(200).json({ 'error': false, 'Business units': data, 'message': data.businessUnit_name + ' Business units was selected' }))
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Country with id=" + id
            });
        });
}

// Controller to Create Business Units 
exports.createBusinnesUnits = (req, res, next) => {
    if (!req.body.business_unit_name) {
        res.status(400).send({
            message: "Business Unit name Content can not be empty!"
        });
        return;
    }
    if (!req.body.code_business_unit) {
        res.status(400).send({
            message: "Code Business Unit Content can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).send({
            message: "Description Content can not be empty!"
        });
        return;
    }

    const business_unit = new Business_unit({
        business_unit_name: req.body.business_unit_name,
        code_business_unit: req.body.code_business_unit,
        slug: slug(req.body.business_unit_name),
        status: 1,
        description: req.body.description,
        created_at: Date.now(),
        updated_at: Date.now()
    });
    business_unit.save().then(
        () => {
            res.status(201).json({ 'error': false, 'message': 'Business units ' + business_unit.business_unit_name + ' was created' });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Controller to Update Business Units 
exports.updateBusinnesUnits = (req, res, next) => {
    let { business_unit_name, code_business_unit, description } = req.body;
    const businessUnit_id = req.params.id;
    Business_unit.update({ business_unit_name: business_unit_name, code_business_unit: code_business_unit, slug: slug(req.body.business_unit_name), description: description },
        { where: { id: businessUnit_id } })
        .then(data => res.status(200).json({ 'error': false, 'message': 'The Business Unit was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}

// Controller to Enable Business Units 
exports.enableBusinnesUnits = (req, res, next) => {
    let status = 1;
    const businessUnit_id = req.params.id;
    Business_unit.update({ status: status },
        { where: { id: businessUnit_id } })
        .then(data => res.status(200).json(
            {
                'error': false,
                'message': 'The Business Units id = ' + businessUnit_id + ' was enabled'
            }))
        .catch(error => res.status(400).json({
            'error': true, 'message': error
        }));
}

// Controller to Disable Business Units 
exports.disableBusinnesUnits = (req, res, next) => {
    let status = 0;
    let disabledAt = Date.now();
    const businessUnit_id = req.params.id;
    Business_unit.update({ status: status, disabledAt: disabledAt },
        { where: { id: businessUnit_id } })
        .then(data => res.status(200).json(
            {
                'error': false,
                'message': 'The Business Units id = ' + businessUnit_id + ' was disable'
            }))
        .catch(error => res.status(400).json({
            'error': true, 'message': error
        }));
}