const { DataTypes } = require("sequelize");
const db = require("../config/db");

const users = db.define(
  "users",
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
    image : {
      type : DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    gender : {
      type : DataTypes.STRING
    },
    role : {
      type : DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);

module.exports = users;
