'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
    {
        id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        },
        username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        },
        password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
        nama: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
        alamat: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
        nomorhp: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'user',
        timestamps: false,
        name: {
        singular: 'User',
        plural: 'User',
        },
    }
    );

    User.associate = function (models) {
        User.hasMany(models.Message, {
            foreignKey: 'id_user_pengirim',
            as: 'messages',
        });
        const Friend = models.Friend;
        User.belongsToMany(User, { through: Friend, foreignKey: 'id_user', otherKey: 'id_friend', as: 'friends' });
    };
    return User;
}

