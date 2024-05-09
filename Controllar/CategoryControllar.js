const category = require("../Model/CategoryModel")
const cloudinary = require('cloudinary').v2
const fs = require("fs")
cloudinary.config({
    cloud_name: 'dglihfwse',
    api_key: '939345957566958',
    api_secret: 'q-Pg0dyWquxjatuRb62-PtFzkM0'
})

const uploadImage = async (file) => {
    try {
        const uploadFile = await cloudinary.uploader.upload(file)
        return uploadFile.secure_url
    } catch (error) {
        console.log(error);
    }
}


const createRecord = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            return res.status(401).json({
                success: false,
                mess: "Fill All Required Fields"
            })
        }

        const data = new category({ name, description })
        if (req.file) {
            const url = await uploadImage(req.file.path)
            data.image = url
        }
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Category Created Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Imternal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await category.find()
        res.status(200).json({
            success: true,
            mess: "Category Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Imternal Server Error"
        })
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await category.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            mess: "Category Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Imternal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await category.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.image)
            } catch (error) { }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Category Deleted Successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Imternal Server Error"
        })
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await category.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.description = req.body.description ?? data.description
            if (req.file) {
                try {
                    fs.unlinkSync(data.image)
                } catch (error) { }
                const url = await uploadImage(req.file.path)
                data.image = url
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Category update successfully ",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Imternal Server Error"
        })
    }
}
module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    deleteRecord: deleteRecord,
    updateRecord: updateRecord
}