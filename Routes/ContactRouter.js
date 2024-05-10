const { createRecord, getRecord } = require("../Controllar/ContactControllar")

const contactRouter = require("express").Router()

contactRouter.post("/contact" ,createRecord)
contactRouter.get("/contact" ,getRecord)

module.exports = contactRouter