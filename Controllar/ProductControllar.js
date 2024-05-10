const product = require("../Model/ProductModel")
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
        console.log(req.body)
        const { productname, categoryname, productdescription } = req.body
        if (!productname || !categoryname || !productdescription) {
            return res.status(401).json({
                success: false,
                mess: "Fill All Required Fields"
            })
        }
        const data = new product({ productname, categoryname, productdescription })
        console.log(req.file, req.files)
        if (req.files.image) {
            const url = await uploadImage(req.files.image[0].path)
            data.image = url
        }
        if (req.files.image1) {
            const url = await uploadImage(req.files.image1[0].path)
            data.image1 = url
        }
        if (req.files.image2) {
            const url = await uploadImage(req.files.image2[0].path)
            data.image2 = url
        }
        if (req.files.image3) {
            const url = await uploadImage(req.files.image3[0].path)
            data.image3 = url
        }
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Product Created Successfully",
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
        let data = await product.find()
        res.status(200).json({
            success: true,
            mess: "Product Found",
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
        let data = await product.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            mess: "Product Found",
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
        let data = await product.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.image)
            } catch (error) { }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Product Deleted Successfully"
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
        let data = await product.findOne({ _id: req.params._id })
        if (data) {
            data.productname = req.body.productname ?? data.productname
            data.productdescription = req.body.productdescription ?? data.productdescription
            data.categoryname = req.body.categoryname ?? data.categoryname
            // if (req.files) {
                if (req.files.image) {
                    try {
                        fs.unlinkSync(data.image)
                    } catch (error) { }
                    const url = await uploadImage(req.files.image[0].path)
                    data.image = url
                }
                if (req.files.image1) {
                    try {
                        fs.unlinkSync(data.image1)
                    } catch (error) { }
                    const url = await uploadImage(req.files.image1[0].path)
                    data.image1 = url
                }
                if (req.files.image2) {
                    try {
                        fs.unlinkSync(data.image2)
                    } catch (error) { }
                    const url = await uploadImage(req.files.image2[0].path)
                    data.image2 = url
                }
                if (req.files.image3) {
                    try {
                        fs.unlinkSync(data.image3)
                    } catch (error) { }
                    const url = await uploadImage(req.files.image3[0].path)
                    data.image3 = url
                // }
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