const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Country', {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.STRING,
    },
    population:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false}
  );
};