'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch_Filiale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Branch_Filiale.init({
    branch_id: DataTypes.INTEGER,
    filiale_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Branch_Filiale',
  });
  return Branch_Filiale;
};