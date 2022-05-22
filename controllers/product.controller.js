const Product = require('../models/Product')
const LogMongo = require('../models/Logs')
const addressIp = require('../utils/netAddress')

const getLogs = async(req,res,next) => {
    try {
        const logs = await LogMongo.find({}).sort({'updatedAt': -1})
        return res.json(logs)
    } catch (error) {
        return res.json({
            code: 500,
            message: 'Error'
        })
    }
}
const getProducts = async(req,res,next) => {    
    try {
        const products = await Product.find({}).sort({'updatedAt': -1})
        await new LogMongo({ip: addressIp().en0,action: 'getProducts',role: 'client'}).save()

        return res.json({
            products,
            code: 200
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: 'Error'
        })
    }
} 

const addProduct = async(req,res,next) => {
    try {
        const {fullname, content, optionSize, optionIce, optionSugar} = req.body
        const newProduct = new Product({fullname,content,optionIce,optionSize, optionSugar})
        await new LogMongo({ip: addressIp().en0,action: 'addProduct',role: 'client'}).save()
        await newProduct.save();
        return res.json({
            code: 200,
            message: 'insert-success'
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: 'Error'
        })
    } 
}

const updateProduct = async(req,res,next) => {
    try {
        const {id,fullname,content,optionIce,optionSize,optionSugar} = req.body;
        const product = await Product
            .findOneAndUpdate(
                {_id:id},
                {fullname,content,optionIce,optionSize,optionSugar},
                {upsert:true,new:true}
            )
        await new LogMongo({ip: addressIp().en0,action: 'updateProduct',role: 'client'}).save()
        return res.json({
            code: 200,
            product: product
        })

    } catch (error) {
        return res.json({
            code: 500,
            message: 'Error'
        })
    }
}

const deleteProduct = async(req,res,next) => {
    try {
        const { id } = req.body;

        await Product.findOneAndDelete({_id: id})
        await new LogMongo({ip: addressIp().en0,action: 'deleteProduct',role: 'client'}).save()
        return res.json({
            code: 200,
            message: 'delete success'
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: 'Error'
        })
    }
}
module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getLogs
}