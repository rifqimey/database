const dotenv = require("dotenv")
dotenv.config()
const { Sequelize } = require("sequelize");

const db = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USERNAME}`,`${process.env.DB_PASSWORD}`,{
    dialect : 'postgres',
    port : process.env.DB_PORT
})
module.exports = db