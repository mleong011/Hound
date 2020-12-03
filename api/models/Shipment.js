'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {};

  Shipment.init({
    dateordered: DataTypes.DATEONLY,
    deliverydate: DataTypes.DATEONLY,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shipment',
  });

  Shipment.associate = (models) => {
    //1-1: One Order has one set of Shipment Information
    // Creates orderId on Shipment model and table
    models.Shipment.belongsTo(models.Order, {
      foreignKey: {name: 'orderId'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      hooks: true
    });

  };
  
  return Shipment;
};