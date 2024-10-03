const { Op } = require("sequelize");
const products = require("../models/products");

//untuk menambahkan product(create)
const createproduct = async (req, res) => {
  try {
    const { name, price, desciption, size, category} = req.body;

    const file = req.file ? req.file?.path : null;

    const data = await products.create({
      name: name,
      image: file,
      price: price,
      desciption: desciption,
      size: size,
      category : category
    });
    res.status(201).json({
      msg: "succes create product",
      // data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed create product",
      error,
    });
  }
};

//untuk meelihat seluruh product(read)
const findAllproduct = async (req, res) => {
  const { search = "", orderBy = "id", sortBy = "ASC", limit = 10, page = 1, category= "" } = req.query;

  const offset = (page - 1) * limit;
  let where = {};
  let order = [];
  if (search) {
    where = {
      name: { [Op.iLike]: "%" + search + "%" },
    };
  }
  if (category) {
    where = {
      category: category,
    };
  }
  if (search && category) {
    where = {
      [Op.and]: {
        name: { [Op.iLike]: "%" + search + "%" },
        category: { [Op.iLike]: "%" + category + "%" },
      },
    };
  }
  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }
  try {
    const data = await products.findAll({
      where,
      limit,
      offset,
      order,
    });

    res.status(200).json({
      msg: "succes find all product",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//untuk menambahkan satu product(read)
const findOneproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

//untuk mengupdate product(put/patch)
const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, desciption, size, category } = req.body;
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    if (req.file) {
      await product.update({
        name,
        price,
        desciption,
        size,
        image: req?.file?.path,
      });
      return res.status(200).json({
        msg: "succes update product with image",
        data: product,
      });
    }
    await product.update({ name, price, desciption, size, category });
    await product.save();
    return res.status(200).json({
      msg: "succes update product",
      data: product,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

//untuk menghapus  product(delete)
const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    await product.destroy();
    await product.save();
    res.status(200).json({
      msg: "succes delete product",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = {
  createproduct,
  findAllproduct,
  findOneproduct,
  updateproduct,
  deleteproduct,
};
