const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
// app.use(
//   cors({
//     origin: ["https://wagxsist.vercel.app", "https://wagxsist-abhisekadhikari666-gmailcom.vercel.app"],
//     methods: ["GET", "POST"],
//   })
// )
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require("./Routes/route"))
app.set(require("dotenv").config())

const PORT = 3000 || process.env.PORT

mongoose
  .connect(process.env.MONGO_DB_URL)
  // .connect("mongodb://127.0.0.1:27017/wagxsist")
  .then(() => {
    console.log("Connection Successful")
  })
  .catch((err) => {
    if (err) {
      console.error("Connection Unsuccessful" + err)
    }
  })

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
