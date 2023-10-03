const cloudinary = require("cloudinary").v2
const productModel = require("../models/productModel")

cloudinary.config({
  cloud_name: "dvioldntl",
  api_key: "984391433885796",
  api_secret: "LBpeK5EjUozyX3HmDnhDBw3XrwI",
  // secure: true, // -- For all legacy SDKs, you'll probably want to set the secure parameter to true to ensure that your transformation URLs are always generated as HTTPS.
})

const productController = async (req, res) => {
  try {
    const { user_id, name, description } = req.body
    if (!user_id || !name || !description || !req.file)
      return res.json({ message: "Fill All The Fields" })
    const imageFile = req.file.path
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "wagXsist",
    })
    const productData = new productModel({
      userId: user_id,
      name,
      description,
      image: result.secure_url,
    })
    console.log(productData)
    await productData.save()
    res.json({ message: "Product Successfully Created", success: true })
  } catch (error) {
    res.json({ message: "Try Again Later, Aligator", success: false })
  }
}

module.exports = productController
