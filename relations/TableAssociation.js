const {Branch} = require('../models'); // To Get the model for Branch
const { Branch_Filiale } = require('../models');

const { Filiales } = require('../models'); // To Get the model for Filiale
const { Countries } = require('../models'); // To Get the model for Country
const { Business_unit } = require('../models'); // To Get the model for Filiale



exports.branchFilialesAssociation = () => {

    Filiales.belongsToMany(Branch, {
        through: Branch_Filiale,
        foreignKey: 'filiale_id',
        otherKey: 'branch_id',
    });
    
    Branch.belongsToMany(Filiales, {
        through: Branch_Filiale,
        foreignKey: 'branch_id',
        otherKey: 'filiale_id',
    });
    
    Branch_Filiale.belongsTo(Branch, {
        foreignKey: 'branch_id',
        // as: 'Branch',
    });
    
    Branch_Filiale.belongsTo(Filiales, {
        foreignKey: 'filiale_id',
        // as: 'Filiales',
    });
    
}

exports.CountryFilialeAssociation = () => {
    Filiales.belongsTo(Countries, {
        foreignKey: 'countriesId'
    });
    Countries.hasMany(Filiales, {
        foreignKey: 'countriesId'
    });
}

exports.BusinessUnitFilialeAssociation = () => {
    Filiales.belongsTo(Business_unit, {
        foreignKey: 'business_unitId'
    });
    Business_unit.hasMany(Filiales, {
    foreignKey: 'business_unitId'
    });
    
}