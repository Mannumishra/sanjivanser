const contact = require("../Model/ContactModel")

const createRecord = async (req, res) => {
    try {
        const { name, email, phone, companyname, business } = req.body
        if (!name || !email || !phone || !companyname || !business) {
            return res.status(401).json({
                success: false,
                mess: "Fill All field"
            })
        }
        const data = new contact({ name, email, phone, companyname, business })
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Contact created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await contact.find()
        res.status(200).json({
            success: true,
            mess: "Contact Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord
}