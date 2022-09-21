"use strict";

module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'SaleProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {
      tableName: 'salesProducts',
      timestamps: false,
      underscored: true,
    }
  );

  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: models.SaleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
    });
    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: models.SaleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  
  };

  return saleProduct;
};
