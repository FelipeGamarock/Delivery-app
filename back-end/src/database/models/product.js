'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: { 
      type: DataTypes.DOUBLE,
    },
    urlImage: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Products',
  });
  Product.associate = (models) => {
    Product.hasMany(models.SalesProducts, {
      foreignKey: 'product_id', as: 'Product'
    })
  }
  return Product;
};