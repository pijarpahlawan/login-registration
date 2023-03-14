/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
/* eslint-disable valid-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_name',
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'user_email',
        validate: {
          isEmail: true,
        },
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_password',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    },
  );
  return User;
};
