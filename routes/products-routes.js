const express = require('express');
const HttpError = require('../models/http-error');

const productsControllers = require('../controllers/products-controllers');
const fileUpload = require('../middlewares/file-upload');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);

router.get('/:pid', productsControllers.getProductById);

router.post(
    '/', 
    fileUpload.single('image'),
    productsControllers.createProduct
);

router.patch('/:pid', productsControllers.updateProduct);

router.delete('/:pid', productsControllers.deleteProduct);


module.exports = router;
