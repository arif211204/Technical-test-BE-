'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, undefined]
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1 
      }
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0 
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0 
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};