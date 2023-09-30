const { validationResult } = require("express-validator")
const hashPassword = require("../utils/hashPassword")
const userSchema = require("../models/userSchema")

const userController = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorData = errors.array()
      return res.json({ errorData, success: false })
    }
    const { username, email, password } = req.body
    const hpassword = await hashPassword(password)
    const isEmailFound = await userSchema.findOne({ email: email })
    if (isEmailFound) return res.json({ message: "Email Already Exists" })
    const userData = new userSchema({ username, email, password: hpassword })
    await userData.save()
    res.status(200).json({
      message: "Succesfully Registered",
      success: true,
    })
  } catch (error) {
    res.status(400).json({ message: error["message"], success: false })
    console.log(error)
  }
}

module.exports = userController
