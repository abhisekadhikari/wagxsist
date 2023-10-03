const { check } = require("express-validator")
const route = require("express").Router()
const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")
const userSchema = require("../models/userSchema")
const productController = require("../controllers/productController")
const upload = require("../utils/multer")
const productModel = require("../models/productModel")

route.get("/", async (req, res) => {
  const users = await productModel.find({}).populate("userId")
  res.json(users)
})

route.post(
  "/register",
  [
    check("username")
      .isLength({
        min: 3,
      })
      .withMessage("Enter Name (minimum 3+ chharacters)"),
    check("email")
      .isLength({ min: 8 })
      .withMessage("minimum 8 chharacters")
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter Valid Email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Minimum 8 Characters")
      .isStrongPassword({
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 1,
        minUppercase: 1,
      })
      .withMessage(
        "Enter Strong Password (Must Contains 1 Uppercase Char, Minimum 2 numbers and 1 special Symbol)"
      ),
  ],
  userController
)

route.post(
  "/login",
  [
    check("email")
      .isLength({ min: 8 })
      .withMessage("minimum 8 chharacters")
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter Valid Email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password Minimum 8 Characters"),
  ],
  loginController
)

route.post("/product", upload.single("image"), productController)

module.exports = route
