const { response } = require ('express');
const { Product } = require('../models');

// const getProducts = async( req, res = response ) => {

// }

// const getProductById = async( req, res = response ) => {
    
// }

const createProduct = async( req, res = response ) => {
    
    const { status, user, ...body } = req.body;

    const productDB = await Producto.findOne({ name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `Product ${ productDB.name } already exists`
        });
    }
    
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product( data );

    await product.save();

    res.status(201).json( product );

}

// const updateProduct = async( req, res = response ) => {
    
// }

// const deleteProduct = async( req, res = response ) => {
    
// }

module.exports ={
    createProduct,

}