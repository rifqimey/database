const { DataTypes } = require("sequelize");
const db = require("../config/db");

const promotion = db.define(
  "promotion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    codePromo: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image : {
      type : DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);

module.exports = promotion;
