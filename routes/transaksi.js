const {
  createTransaksi,
  findAlltransaksi,
  findOneTransaksi,
  updateTransaksi,
  deleteTansaksi,
} = require("../controllers/transaksi");
const { verifyToken } = require("../midleware/verifyToken");

const transaksiRouter = require("express").Router();

transaksiRouter.post("/",verifyToken,createTransaksi);
transaksiRouter.get("/", findAlltransaksi);
transaksiRouter.get("/:id", findOneTransaksi);
transaksiRouter.patch("/:id", updateTransaksi);
transaksiRouter.delete("/:id", deleteTansaksi);

module.exports = transaksiRouter;
