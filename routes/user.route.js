const { Router } = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

module.exports = userRouter;
