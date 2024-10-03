const { createproduct, findAllproduct, findOneproduct, updateproduct, deleteproduct } = require("../controllers/product")
const upload = require("../midleware/upload")
const { verifyToken, verifyAdmin } = require("../midleware/verifyToken")

const productRouter = require("express").Router()


productRouter.post("/",verifyAdmin,upload.single("image"),createproduct)
productRouter.get("/", findAllproduct)
productRouter.get("/:id", findOneproduct)
productRouter.patch("/:id",upload.single("image"),updateproduct)
productRouter.delete("/:id", deleteproduct)


module.exports = productRouter