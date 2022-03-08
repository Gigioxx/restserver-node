const { response } = require('express');
const { uploadFile } = require('../helpers');

const { User, Product }  = require('../models');

const loadFile = async( req, res = response ) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    
    try {
        // const fileName = await uploadFile( req.files, [ 'txt', 'md' ], 'textFiles' );
        const fileName = await uploadFile( req.files, undefined, 'images' );
        res.json({ fileName });
        
    } catch (error) {
        res.status(400).json({ error });
    }

}

const updateImage = async( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `User with ID ${ id }, does not exist.`
                });
            }
        break;

        case 'products':
            model = await Product.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `Product with ID ${ id }, does not exist.`
                });
            }
        break;
    
        default:
            return res.status(500).json({
                msg: 'This option is not available yet'
            });
    }

    const fileName = await uploadFile( req.files, undefined, collection );
    model.img = fileName;

    await model.save();

    res.json({ model });

}

module.exports = {
    loadFile,
    updateImage
}