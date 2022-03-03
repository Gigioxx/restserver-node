const { response } = require ('express');
const { Product } = require('../models');

const getProducts = async( req, res = response ) => {

    const { start = 0, limit = 5 } = req.query;
    const filter = { status: true }

    const [ total, products ] = await Promise.all([
        Product.countDocuments( filter ),
        Product.find( filter )
            .populate( 'user', 'name' )
            .skip( Number(start) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        products
    });

}

const getProductById = async( req, res = response ) => {
    
    const { id } = req.params;
    const product = await Product.findById( id )
                            .populate( 'user', 'name' )
                            .populate( 'categorie', 'name' );

    res.json( product );

}

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

const updateProduct = async( req, res = response ) => {
    
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new: true } );

    res.json( product );

}

// const deleteProduct = async( req, res = response ) => {
    
// }

module.exports ={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,

}