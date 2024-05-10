const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must Required"]
    },
    email: {
        type: String,
        required: [true, "Name is must Required"]
    },
    phone: {
        type: String,
        required: [true, "Name is must Required"]
    },
    companyname: {
        type: String,
        required: [true, "Name is must Required"]
    },
    business: {
        type: String,
        required: [true, "Name is must Required"]
    }
}, { timestamps: true })

const contact = mongoose.model("contact", contactSchema)
module.exports = contact