const { validationResult } = require("express-validator")
const checkPassword = require("../utils/checkPassword")
const userSchema = require("../models/userSchema")
const jwt = require("jsonwebtoken")

const loginController = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = errors.array()
    return res.json({ err, success: false })
  }
  const { email, password } = req.body
  const isUserFound = await userSchema.findOne({ email: email })
  if (!isUserFound) return res.json({ message: "Invalid Credentials", success: false })
  const verify = await checkPassword(password, isUserFound.password)
  if (!verify)
    return res.json({ message: "Invalid Credentials", success: false })
  const userid = isUserFound._id
  const accessToken = jwt.sign({ userid }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  })
  res.json({
    message: "Hence You Successfully Verified",
    success: true,
    "token": accessToken,
  })
}

module.exports = loginController
