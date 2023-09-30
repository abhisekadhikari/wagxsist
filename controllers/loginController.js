const { validationResult } = require("express-validator")
const checkPassword = require("../utils/checkPassword")
const userSchema = require("../models/userSchema")

const loginController = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = errors.array()
    return res.json({ err, success: false })
  }
  const { email, password } = req.body
  const isUserFound = await userSchema.findOne({ email: email })
  if (!isUserFound) return res.json({ message: "Email Not Found" })
  const verify = await checkPassword(password, isUserFound.password)
  if (!verify)
    return res.json({ message: "Invalid Credentials", success: false })
  res.json({
    message: "Hence You Successfully Verified",
    success: true,
  })
}

module.exports = loginController
