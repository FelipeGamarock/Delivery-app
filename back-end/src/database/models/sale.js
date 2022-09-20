'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sales =  sequelize.define('Sales', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    userId: DataTypes.NUMBER,
    sellerId: DataTypes.NUMBER,
    totalPrice: DataTypes.DOUBLE,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING
  },{
    timestamps: false,
    underscored: true,
    tableName: 'Sales',
  });
  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, {
      foreignKey: 'user_id', as: 'user'
    });
    Sales.belongsTo(models.Users, {
      foreignKey: 'seller_id', as: 'seller'
    });
    Sales.hasMany(models.SalesProducts, {
      key: 'sale_id', as: 'sales',
    })
  } 
  return Sales;
};