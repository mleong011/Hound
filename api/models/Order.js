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

  }

  return Order;
};