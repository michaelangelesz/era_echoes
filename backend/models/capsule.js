'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Capsule extends Model {


    static associate({ Comment }) {
      Capsule.hasMany(Comment, { foreignKey: 'capsule_id', as: 'comments' })
    }

  };

  Capsule.init({
    capsuleId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true

    },
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    cuisines: DataTypes.STRING,
    pic: DataTypes.STRING,
    founded: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Capsule',
  });
  return Capsule;
};