'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pendente"
      },
    },
    {
      tableName: 'sales',
      timestamps: false,
      underscored: true,
    }
  );

  Sale.associate = (models) => {
    models.Sale.belongsTo(models.User, {
      foreignKey: "sellerId",
      as: "seller"
    });
    // models.Sale.hasMany(models.SaleProduct, {
    //   foreignKey: "saleId",
    //   as: "saleProducts"
    // });
  };

  return Sale;
};
