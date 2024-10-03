const { Op } = require("sequelize");
const promotion = require("../models/promotion");

const createPromotion = async (req, res) => {
  try {
    const { name, codePromo, description, image } = req.body;
    const file = req.file ? req.file?.path : null;

    const data = await promotion.create({
      name: name,
      codePromo: codePromo,
      description: description,
      image : file
    });
    res.status(201).json({
      msg: "succes",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed",
      error,
    });
  }
};

const findAllpromotion = async (req, res) => {
  const {search, orderBy, sortBy, limit, page}=req.query

  const offset = ((page -1) * limit)
  let where = {};
  let order = [];
  if(search){
    where = {
      name : {[Op.iLike]: "%" + "%" }
    }
  }
  if(orderBy && sortBy){
    order = [[orderBy, `${sortBy}`]]
  }
  try {
    const data = await promotion.findAll({
      where,
      limit,
      offset,
      order
    });
    res.status(200).json({
      msg: "succes findAll promotion",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const findOnepromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await promotion.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const updatepromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, codePromo, description,  image } = req.body;
    const promotions = await promotion.findByPk(id);
    if (!promotions) {
      return res.status(404).json({ msg: " not found" });
    }
    await promotions.update({ name, codePromo, description, image });
    await promotions.save();
    res.status(200).json({
      msg: "succes update ",
      data: promotions,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const deletepromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotions = await promotion.findByPk(id);
    if (!promotions) {
      return res.status(404).json({ msg: "not found" });
    }
    await promotions.destroy();
    await promotions.save();
    res.status(200).json({
      msg: "succes ",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = {
  createPromotion,
  findAllpromotion,
  findOnepromotion,
  updatepromotion,
  deletepromotion,
};
