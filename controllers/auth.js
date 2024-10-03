const users = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken")

 const register = async (req, res) => {
  try {
    const { name, email, image, password : userPassword, number, gender } = req.body;

    const exisUser = await users.findOne({where : {
      email
    }})

    if(exisUser) {
      return res.status(400).json({ msg : "user has been registered"})
    }
    
    const salt = await bcrypt.genSalt();
    const encryptpassword = await bcrypt.hash(userPassword, salt);
    const data = await users.create({
      name,
      email,
      image,
      password : encryptpassword,
      number,
      gender,
      role: "user",
    });
    res.status(201).json({ msg: "succes register user"});
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "internal server error", error });
  }
};

const login = async (req, res)=>{
  try{
    const {email, password} = req.body
    const user = await users.findOne({where : {email}})
    //cek apakah user ada di db atau tidak
    if(!user){
      return res.status(404).json({msg : "user not found"})
    }
    const userPassword = user.getDataValue("password")
    //bandingkan data dari user dengan password yang ada di db
    const match = await bcrypt.compare(password, userPassword)
    if(!match){
      return res.status(404).json({msg : "wrong email or password"})
    }
    const token = jwt.sign({email, id : user.getDataValue("id"), role : user.getDataValue("role")},process.env.SECRET_KEY, {
      expiresIn : "1d"
    })
    res.status(200).json({msg : "login succes", token})
  }catch(error){
    console.log({ error });
    res.status(500).json({ msg: "internal server error", error });
  }
}

module.exports = {
    register,
    login
}
