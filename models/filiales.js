'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filiales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Filiales.init({
    filiale_name: DataTypes.STRING,
    code_filiale: DataTypes.STRING,
    business_unitId: DataTypes.INTEGER,
    countries_code: DataTypes.STRING,
    countriesId: DataTypes.INTEGER,
    businessUnit_code: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    disabledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Filiales',
  });
  return Filiales;
};