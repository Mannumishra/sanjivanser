const mongoose = require("mongoose")

const productschema = new mongoose.Schema({
    productname: {
        type: String,
        required: [true, "Product name is must required"]
    },
    categoryname: {
        type: String,
        required: [true, "Category name is must required"]
    },
    productdescription: {
        type: String,
        required: [true, "Description is  must Required"]
    },
    image: {
        type: String,
        required: [true, "Image is must Required"]
    },
    image1: {
        type: String,
        required: [true, "Image is must Required"]
    },
    image2: {
        type: String,
        required: [true, "Image is must Required"]
    },
    image3: {
        type: String,
        required: [true, "Image is must Required"]
    }
})

const product = mongoose.model("product", productschema)

module.exports = product