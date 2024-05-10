const mongoose = require("mongoose")

const categoryschema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: [true, "Category name is must required"]
    },
    description: {
        type: String,
        required: [true, "Description is  must Required"]
    },
    image: {
        type: String,
        required: [true, "Image is must Required"]
    }
})

const category = mongoose.model("Ctegory", categoryschema)

module.exports = category