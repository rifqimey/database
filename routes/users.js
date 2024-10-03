const {
  createUsers,
  findAllUsers,
  findOneUsers,
  updateUsers,
  deletUsers,
} = require("../controllers/user");
const upload = require("../midleware/upload");

const userRouter = require("express").Router();

userRouter.post("/", upload.single("image"),createUsers);
userRouter.get("/", findAllUsers);
userRouter.get("/:id", findOneUsers);
userRouter.patch("/:id",upload.single("image"), updateUsers);
userRouter.delete("/:id", deletUsers);

module.exports = userRouter;
