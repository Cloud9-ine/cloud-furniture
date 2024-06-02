const fs = require('fs');

const HttpError = require('../models/http-error');
const Product = require('../models/product');


const getAllProducts = async (req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        return next(new HttpError(
            `Could not find products, please try again`,
            500
        ));
    }

    res.json({ 
        products: products.map(p => p.toObject( { getters: true } )) 
    });
}

const getProductById = async (req, res, next) => {
    const pid = req.params.pid;

    let product;
    try {
        product = await Product.findById(pid);
    } catch (err) {
        return next(new HttpError(
            `Could not find product, please try again`,
            500
        ));
    }

    if (!product) {
        return next(new HttpError(
            `Could not find product by ${pid}, please try again`,
            404
        ));
    }

    res.json({ 
        product: product.toObject( { getters: true } ) 
    });
}

const createProduct = async (req, res, next) => {
    const { name, description, price, quantity, available_date, tags, images } = req.body;

    const curr_date = new Date();
    const newProduct = new Product({
        name,
        description,
        price,
        quantity,
        posted_date: `${curr_date.getFullYear()}/${curr_date.getMonth()+1}/${curr_date.getDate()}`,
        available_date,
        tags,
        images: [req.file.path]
    });

    try {
        await newProduct.save();
    } catch (err) {
        return next(new HttpError(
            'Creating product failed, please try again',
            500
        ));
    }

    res.status(201).json({product: newProduct});
}

const updateProduct = async (req, res, next) => {
    const pid = req.params.pid;

    const { name, description, price, quantity, available_date, tags, images } = req.body;

    let newProduct;
    try {
        newProduct = await Product.findById(pid);
    } catch (err) {
        return next(new HttpError(
            `Could not find product and update, please try again`,
            500
        ));
    }

    if (!newProduct) {
        return next(new HttpError(
            `Could not find product by ${pid} and update, please try again`,
            404
        ));
    }

    newProduct.name = name;
    newProduct.description =description;
    newProduct.price = price;
    newProduct.quantity = quantity;
    newProduct.available_date = available_date;
    newProduct.tags = tags;
    newProduct.images = images;

    try {
        await newProduct.save();
    } catch (err) {
        return next(new HttpError(
            'Updating product failed, please try again',
            500
        ));
    }

    res.status(200).json({
        product: newProduct.toObject( { getters: true} ) 
    });
}

const deleteProduct = async (req, res, next) => {
    const pid = req.params.pid;

    let product;
    try {
        product = await Product.findById(pid);
    } catch (err) {
        return next(new HttpError(
            `Could not find product and delete, please try again`,
            500
        ));
    }

    if (!product) {
        return next(new HttpError(
            `Could not find product by ${pid} and delete, please try again`,
            404
        ));
    }

    const imagesPaths = product.images;

    try {
        await product.deleteOne();
    } catch (err) {
        return next(new HttpError(
            'Deleting product failed, please try again',
            500
        ));
    }

    imagesPaths.map((path) => {
        fs.unlink(path, err => {
            console.log(err);
        });
    });

    res.status(200).json({message: `Place ${pid} deleted.`});
}


exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
