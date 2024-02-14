'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {    }
  }
  Invoice.init({
    invoiceNo: {
      required:true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    date: {
      required:true,
      type: DataTypes.DATE,
      allowNull: false
    },
    customerName: {
      required:true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255] 
      }
    },
    salespersonName: {
      required:true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255] 
      }
    },
    paymentType: {
      required:true,
      type: DataTypes.ENUM('CASH', 'CREDIT'),
      allowNull: false
    },
    notes: {
      required: false,
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, undefined] 
      }
    },
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};