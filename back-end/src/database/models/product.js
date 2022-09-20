'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    underscore: true,
  });
  Product.associate = (models) => {
    Product.hasMany(models.SalesProducts, {
      foreignKey: 'product_id', as: 'Product'
    })
  }
  return Product;
};