const adminModel = require("../Models/adminschema");

// read all data
const getAllAdmins = async (req, res, next) => {
    console.log('get all admin')
    try {
        let adminData = await adminModel.find({})
        if (!adminData) {
            res.status(404).send("no data to find !")
            throw new Error('no data try again !')
        }
        res.status(200).json(adminData)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getById = async (req, res, next) => {
    let { id } = req.params
    if (!id) {
        res.status(400).json("please send id")
        throw new Error('please send id')
    }
    try {

        let myAdmin = await adminModel.findById(id)
        if (myAdmin) {
            res.status(200).json({ myAdmin })
        } else {
            res.status(400).json("it is not exist ")
        }

    } catch (err) {
        // res.status(404).json("catch error")
        next(err)

    }

}

const saveAdmin = async (req, res, next) => {

    let body = req.body

    try {
        if (!body) {
            // res.status(400).json("please send data")
            throw new Error('please send data')
        }
        console.log('create admin', body)
        let newAdmin = await adminModel.create(body)

        if (!newAdmin) {
            throw new Error("not create admin")
        }
        res.json({ message: `created admin ${body.username}` })
    } catch (err) {
        next(err)
    }
}

const updateAdminById = async (req, res, next) => {
    let body = req.body
    let { id } = req.params
    if (!id || !body) {
        res.status(400).json("please send id")
        throw new Error('please send id')
    }
    try {
        const newAdmin = await adminModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        if (!newAdmin) {
            res.send('no admin matching data')
        }
        res.status(200).json(newAdmin)

    } catch (err) {
        next(err)
    }

}

// delete
const deleteAdmin = async (req, res, next) => {
    console.log("delte admin")
    let { id } = req.params

    if (!id) {
        res.status(400).json("please send id")
        throw new Error('please send id')
    }
    try {

        const adminOld = await adminModel.findOneAndDelete({ _id: id }).then((dd) => {
            console.log("sccefuly delete")
        }).catch((e) => {
            throw new Error("not found in database")
        })

        let myAdmin = await adminModel.deleteOne({ _id: id })
        console.log(myAdmin)
        // res.status(200).json({ myAdmin })
        res.status(200).send('deleted order successful')


    } catch (err) {
        next(err)
        // res.status(404).json("catch error")

    }

}

module.exports = { getAllAdmins, getById, saveAdmin, updateAdminById, deleteAdmin }