'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {}
  Message.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_user_pengirim: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        foreignKey: true,
      },
      pesan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      id_user_dikirim: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'message',
      timestamps: false,
      name: {
        singular: 'Message',
        plural: 'Message',
      },
    }
  );

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      foreignKey: 'id_user_pengirim',
      as: 'user',
    });
  };
  

  return Message;
};
