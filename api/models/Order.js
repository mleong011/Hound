'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Order extends Model {};

  Order.init({
    trackingnumber: DataTypes.STRING,
    snippet: DataTypes.STRING,
    link: DataTypes.STRING,
    from: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.associate = (models) => {

    // 1-Many: One User can have Many Orders
    // Creates userId on Order model and table
    models.Order.belongsTo(models.User, {
      foreignKey: {name: 'userId'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      hooks: true
    })

    //1-1: One Order has one set of Shipment Information
    // Creates orderId on Shipping model and table
    models.Order.hasOne(models.Shipment, {
      foreignKey: {name: 'orderId'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      hooks: true
    });
  }

  return Order;
};