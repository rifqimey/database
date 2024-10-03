const { DataTypes } = require("sequelize");
const db = require("../config/db");
const users = require("./users");
const products = require("./products");

const transaksi = db.define(
  "transaksi",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id :{
      type : DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    paymentMethod : {
      type : DataTypes.STRING
    },
    delivery_cost :{
      type : DataTypes.INTEGER
    },
    amount : {
      type: DataTypes.INTEGER
    },
    status : {
      type : DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);

module.exports = transaksi;

transaksi.belongsTo(users, {foreignKey : "user_id", as : "user"})
transaksi.belongsTo(products, {foreignKey : "productId", as : "product"})
users.hasMany(transaksi, {foreignKey : "id"})
products.hasMany(transaksi, {foreignKey : "id"})
