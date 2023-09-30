const bcrypt = require("bcryptjs")

const checkPassword = async (password, hashpassword) => {
  const verify = await bcrypt.compare(password, hashpassword)
  return verify
}

module.exports = checkPassword
