const { Op } = require("sequelize");
const transaksi = require("../models/transaksi");
const users = require("../models/users");
const products = require("../models/products");

const createTransaksi = async (req, res) => {
  try {
    const { id } = req.payload;
    const { productId, paymentMethod, delivery_cost } = req.body;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const product = await products.findByPk(productId, {});
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    const priceProduct = product.getDataValue("price");
    const amount = priceProduct + Number(delivery_cost);
    const data = await transaksi.create({
      user_id: id,
      productId,
      paymentMethod,
      delivery_cost,
      amount,
      status: "PENDING",
    });
    res.status(201).json({ msg: "succes create transaction", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "internal servers error" });
  }
};

const findAlltransaksi = async (req, res) => {
  const {
    search = "",
    orderBy = "id",
    sortBy = "ASC",
    limit = 10,
    page = 1,
  } = req.query;

  const offset = (page - 1) * limit;
  let where = {};
  let order = [];
  if (search) {
    where = {
      menu: { [Op.iLike]: "%" + search + "%" },
    };
  }
  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }

  try {
    const data = await transaksi.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({
      msg: "succes findAll transaksi",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const findOneTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaksi.findByPk(id, {
      include: [
        {
          model: products,
          as: "product",
        },
        {
          model: users,
          as: "user",
          attributes: ["name", "email", "role"],
        },
      ],
    });
    if (!data) {
      return res.status(400).json({ msg: "transaction not found" });
    }
    res.status(200).json({ msg: "succes find one transaction", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "internal server error", error });
  }
};

const updateTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, user_id, paymentMethod, delicery_cost, amount } =
      req.body;
    const transaksis = await transaksi.findByPk(id);
    if (!transaksis) {
      return res.status(404).json({ msg: "transaksi not found" });
    }
    await transaksis.update({
      productId,
      user_id,
      paymentMethod,
      delicery_cost,
      amount,
    });
    await transaksis.save();
    res.status(200).json({
      msg: "succes update transaksi",
      data: transaksis,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const deleteTansaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const transaksis = await transaksi.findByPk(id);
    if (!transaksis) {
      return res.status(404).json({ msg: "tansaksi not found" });
    }
    await transaksis.destroy();
    await transaksis.save();
    res.status(200).json({ msg: "succes delete transaksi" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = {
  createTransaksi,
  findAlltransaksi,
  findOneTransaksi,
  updateTransaksi,
  deleteTansaksi,
};
