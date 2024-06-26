const express = require("express")
const categoryRouter = require("./Routes/CategoryRouter")
const productRouter = require("./Routes/ProductRouter")
require("dotenv").config()
require("./DB/ConnextDb")
const app = express()
const cors = require("cors")
const contactRouter = require("./Routes/ContactRouter")
app.use(express.json())
app.set(express.static("./Public"))
app.use(cors())
// app.use("/Public", express.static("Public"))   if not use cloudnary the use 

app.use("/api", categoryRouter)
app.use("/api", productRouter)
app.use("/api", contactRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})