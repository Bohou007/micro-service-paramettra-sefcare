const {Countries} = require('../models'); // To Get the model for Country
const {Filiales} = require('../models'); // To Get the model for Filiales

const slug = require('slug');

// Get the fichier where is write the relation
const relation = require('../relations/TableAssociation');
relation.CountryFilialeAssociation();// get fonction of relation Country and filiale

//Get All Countries save in database
exports.getAllCountries = (req, res, next) => {

    Countries.findAll({include: [Filiales]})
        .then(data => res.status(200).json({ 'error': false, 'countries': data}))

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Countries."
            });
        });
     
}


// Controller to Find and Show one country
exports.getOneContries = (req, res, next) => {
    const id = req.params.id;

    Countries.findByPk(id, {include: [Filiales]})
        .then(data => res.status(200).json({ 'error': false, 'Country': data, 'message': 'One Country was selected' }))
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Country with id=" + id
            });
        });
}


// Controller to Create Country
exports.createCountry = (req, res , next) => {
    if (!req.body.country_iso_code) { 
        res.status(400).send({
            message: "Country ISO Code Content can not be empty!"
        });
        return;
    }
    if (!req.body.country_name) {
        res.status(400).send({
            message: "Country Name Content can not be empty!"
        });
        return;
    }

    const countries = new Countries({
        country_iso_code: req.body.country_iso_code,
        country_name: req.body.country_name,
        slug: slug(req.body.country_name),
        status: 1,
        created_at : Date.now(),
        updated_at : Date.now()
    });
    countries.save().then(
        () => {
            res.status(201).json({'error': false, 'message': 'Country was created'});
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Controller to Update COuntry
exports.updateCountry = (req, res , next) => {
    let { country_iso_code, country_name} = req.body;
    const countries_id = req.params.id;
    Countries.update({ country_iso_code: country_iso_code, country_name: country_name, slug: slug(req.body.country_name)}, 
    { where: { id: countries_id} })
        .then(data => res.status(200).json({ 'error': false,'country':data, 'message': 'The Country id = '+ countries_id + ' was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}


// Controller to Enable Country
exports.enableCountry = (req, res, next) => {
    let status = 1;
    const countries_id = req.params.id;
    Countries.update({ status: status }, 
    { where: { id: countries_id} })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Country id = '+ countries_id + ' was enabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}


// Controller to Disable Country
exports.disableCountry = (req, res, next) => {
    let status = 0;
    let disabledAt = Date.now();
    const countries_id = req.params.id;
    Countries.update({ status: status, disabledAt:disabledAt }, 
    { where: { id: countries_id} })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Country id = '+ countries_id + ' was disabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}