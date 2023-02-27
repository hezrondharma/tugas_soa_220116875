'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {}
  Friend.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.BIGINT.UNSIGNED,
        foreignKey: true,
        allowNull: false,
      },
      id_friend: {
        type: DataTypes.BIGINT.UNSIGNED,
        foreignKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'friend',
      timestamps: false,
      name: {
        singular: 'Friend',
        plural: 'Friend',
      },
    }
  );

  return Friend;
}