const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const route = require("./routes");
const cloudinaryConfig = require("./config/cloudinary");
const transaksi = require("./models/transaksi");
const cors = require("cors")
// const products = require("./models/products");
// const promotion = require("./models/promotion");
// const users = require("./models/users");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin : ["http://localhost:3000", "*"]
}))

db.authenticate()
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cloudinaryConfig)
app.use(route);

app.use(express.static(__dirname));

// promotion.sync().then(()=>{
//   console.log(`BD connected`);
// }).catch(err=>{
//   console.log(err);

// })

transaksi.sync().then(()=>{
  console.log(`DB connected`);
}).catch(err=>{
  console.log(err);

})

// users
//   .sync()
//   .then(() => {
//     console.log(`DB connected`);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// products.sync().then(() => {
//   console.log('product i sycronize');
// }).catch(err => {
//   console.log(err);

// })

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my simple API");
});

app.get("/ping", (req, res) => {
  res.json({ msg: "pong" });
});

app.listen(port, () => {
  console.log(`APP is running on PORT ${port}`);
});
