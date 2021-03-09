'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Countries.init({
    country_iso_code: DataTypes.STRING,
    country_name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    disabledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Countries',
  });
  return Countries;
};