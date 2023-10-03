const multer = require("multer")
const path = require("path")
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false)
      return
    }
    cb(null, true)
  },
})

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, `image-${Date.now()}.${file.originalname.toString()}`)
//   },
// })

// const upload = multer({ storage: storage })

// module.exports = upload
