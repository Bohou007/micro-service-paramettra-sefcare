const { Filiales } = require('../models'); // To Get the model for Filiale
const { Countries } = require('../models'); // To Get the model for Country
const { Branch } = require('../models'); // To Get the model for Branch
const { Business_unit } = require('../models'); // To Get the model for Filiale

const slug = require('slug'); // Module du genere a slug

// Get the fichier where is write the relation
const relation = require('../relations/TableAssociation');
relation.branchFilialesAssociation();// get fonction of relation branch and filiale
relation.CountryFilialeAssociation();// get fonction of relation Country and filiale
relation.BusinessUnitFilialeAssociation();// get fonction of relation Business Unit and filiale

// Controller to Get All Filiales
exports.getAllFiliale = (req, res, next) => {
//Relation of Association
    
    Filiales.findAll({include: [Countries, Business_unit, Branch]})
        .then(data => res.status(200).json({ 'error': false, 'Filiales': data}))

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Filiales."
            });
        });
}
// Controller to Find one Filiale
exports.getOneFiliale = (req, res, next) => {
    //Relation of Association
    
    const id = req.params.id;

    Filiales.findByPk(id, {include: [Countries, Business_unit, Branch]})
        .then(data => res.status(200).json({ 'error': false, 'Filiales': data, 'message': data.filiale_name + ' Filiales was selected' }))
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Filiales with id=" + id
            });
        });
}

// Controller to Create Filiale
exports.createFiliale = (req, res, next) => {

    if (!req.body.code_filiale) {
        res.status(400).send({
            message: "Code Filiale Content can not be empty!"
        });
        return;
    }
    if (!req.body.countries_code) {
        res.status(400).send({
            message: "Countries Code Content can not be empty!"
        });
        return;
    }
    if (!req.body.businessUnit_code) {
        res.status(400).send({
            message: "Business Unit Code Content can not be empty!"
        });
        return;
    }

    let { countries_code, businessUnit_code } = req.body;
    let filiale_name = 'SUNU-' + countries_code + '-' + businessUnit_code;
    const filiale = new Filiales({
        filiale_name: filiale_name,
        code_filiale: req.body.code_filiale,
        countries_code: countries_code,
        businessUnit_code: businessUnit_code,
        slug: slug(filiale_name),
        business_unitId: req.body.business_unitId,
        countriesId: req.body.countriesId,
        description: req.body.description,
        status: 1,
        created_at: Date.now(),
        updated_at: Date.now()
    });
    filiale.save().then(
        () => {
            res.status(201).json({ 'error': false, 'message': 'The Filiale was created' });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}
// Controller to Update Filiale
exports.updateFiliale = (req, res, next) => {

    let { business_unitId, description, businessUnit_code, countriesId, countries_code } = req.body;
    const filiales_id = req.params.id;
    let filiale_name = 'SUNU-' + countries_code + '-' + businessUnit_code;
    Filiales.update({
        businessUnit_code: businessUnit_code,
        countries_code: countries_code,
        filiale_name: filiale_name,
        business_unitId: business_unitId,
        countriesId: countriesId,
        description: description,
        slug: slug(filiale_name)
    },
        { where: { id: filiales_id } })
        .then(data => res.status(200).json({ 'error': false, 'message': 'The Filiales id = ' + filiales_id + ' was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}

// Controller to Enable Filiale
exports.enableFiliale = (req, res, next) => {
    let status = 1;
    const filiale_id = req.params.id;
    Filiales.update({ status: status },
        { where: { id: filiale_id } })
        .then(data => res.status(200).json(
            {
                'error': false,
                'message': 'The Filiales id = ' + filiale_id + ' was enabled'
            }))
        .catch(error => res.status(400).json({
            'error': true, 'message': error
        }));
}
// Controller to Disable Filiale
exports.disableFiliale = (req, res, next) => {
    let status = 0;
    const filiale_id = req.params.id;
    Filiales.update({ status: status },
        { where: { id: filiale_id } })
        .then(data => res.status(200).json(
            {
                'error': false,
                'message': 'The Filiales id = ' + filiale_id + ' was disabled'
            }))
        .catch(error => res.status(400).json({
            'error': true, 'message': error
        }));
}
