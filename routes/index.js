// const users = require("../models/users");

const authRouter = require("./auth");
const productRouter = require("./product");
const promotionRouter = require("./promotion");
const transaksiRouter = require("./transaksi");
const userRouter = require("./users");

const route = require("express").Router();

route.use("/product", productRouter);
route.use("/user", userRouter);
route.use("/transaksi", transaksiRouter);
route.use("/promotion", promotionRouter);
route.use('/auth', authRouter)

module.exports = route;
