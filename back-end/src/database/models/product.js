'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      urlImage: DataTypes.STRING,
    },
    {
      tableName: 'products',
      timestamps: false,
      underscored: true,
    }
  );

  return Product;
};
