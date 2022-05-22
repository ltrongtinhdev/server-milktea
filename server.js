const express = require('express')
require('dotenv').config()
const cors = require('cors')
const morgan  = require('morgan')
const mongoose = require('mongoose')
const ProductRouter = require('./routes/products.route')
const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connect mongodb success')
        })
        .catch((e) => {
            console.log(e)
        })


app.use('/products',ProductRouter)
app.listen(3333, () => {
    console.log('Server running 3333')
})