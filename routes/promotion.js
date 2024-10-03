const {
  createPromotion,
  findAllpromotion,
  findOnepromotion,
  updatepromotion,
  deletepromotion,
} = require("../controllers/promotion");
const upload = require("../midleware/upload");
// const { updateTransaksi } = require("../controllers/transaksi");
const promotionRouter = require("express").Router();

promotionRouter.post("/",upload.single("image"),createPromotion);
promotionRouter.get("/", findAllpromotion);
promotionRouter.get("/:id", findOnepromotion);
promotionRouter.patch("/:id",upload.single("image"), updatepromotion);
promotionRouter.delete("/:id", deletepromotion);

module.exports = promotionRouter;
