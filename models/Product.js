const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    fullname: String,
    content: String,
    optionSugar: String,
    optionIce: String,
    optionSize: String
},{timestamps: true})

const Product = mongoose.model('products',ProductSchema)

module.exports = Product