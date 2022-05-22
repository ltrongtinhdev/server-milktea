const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controller')
router.get('/',ProductController.getProducts)
router.post('/add', ProductController.addProduct)
router.post('/update', ProductController.updateProduct)
router.post('/delete',ProductController.deleteProduct)
router.get('/logs', ProductController.getLogs)
module.exports = router