const { Op, where } = require("sequelize");
const users = require("../models/users");

const createUsers = async (req, res) => {
  try {
    const { name, email, password, number,gender, image} = req.body;
    const file = req.file ? req.file?.path : null;

    const data = await users.create({
      name: name,
      email: email,
      password: password,
      number: number,
      gender : gender,
      image: file
    });
    res.status(201).json({
      msg: "succes create users",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed create users",
      error,
    });
  }
};

const findAllUsers = async (req, res) => {
  const { search, orderBy, sortBy, limit, page, gender } = req.query;

  const offset = ((page - 1) * limit)
  let where = {};
  let order = [];
  if (search) {
    where = {
      name: { [Op.iLike]: "%" + search + "%" },
    };
  }
    if (gender) {
      where = {
        gender: gender
      };
    }
  if (search && gender) {
    where = {
      [Op.and]: {
        name: { [Op.iLike]: "%" + search + "%" },
        gender: { [Op.iLike]: "%" + gender + "%" },
      },
    };
  }
  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }
  try {
    const data = await users.findAll({
      where,
      limit,
      offset,
      gender
    });

    res.status(200).json({
      msg: "succes find all users",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const findOneUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await users.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, number, gender, image} = req.body;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    await user.update({ name, email, password, number,gender, image });
    await user.save();
    res.status(200).json({
      msg: "succes update user",
      data: user,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const deletUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "users not found" });
    }
    await user.destroy();
    await user.save();
    res.status(200).json({ msg: "succes delete users" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = {
  createUsers,
  findAllUsers,
  findOneUsers,
  updateUsers,
  deletUsers,
};
