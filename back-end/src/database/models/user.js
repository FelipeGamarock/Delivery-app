'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Users',
  });
  Users.associate = (models) => {
    Users.hasMany(models.Sales, {
      foreignKey: 'user_id', as: 'user'
    })
    Users.hasMany(models.Sales, {
      foreignKey: 'seller_id', as: 'seller'
    })
  } 
  return Users;
};