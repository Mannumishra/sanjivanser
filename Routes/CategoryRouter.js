const categoryRouter = require("express").Router()
const multer = require("multer")
const { createRecord, getRecord, getSingleRecord, deleteRecord, updateRecord } = require("../Controllar/CategoryControllar")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/Category')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

categoryRouter.post("/category", upload.single("image"), createRecord)
categoryRouter.get("/category", getRecord)
categoryRouter.get("/category/:_id", getSingleRecord)
categoryRouter.delete("/category/:_id", deleteRecord)
categoryRouter.put("/category/:_id", upload.single("image"), updateRecord)

module.exports = categoryRouter
