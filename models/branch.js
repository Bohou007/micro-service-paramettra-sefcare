'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Branch.init({
    branch_name: DataTypes.STRING,
    code_branch: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    disableAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};