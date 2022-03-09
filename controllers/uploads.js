const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { uploadFile } = require('../helpers');

const { User, Product }  = require('../models');

const loadFile = async( req, res = response ) => {
    
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

    // Clean previously uploaded images
    if ( model.img ) {
        // Delete image from server
        const imagePath = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( imagePath ) ) {
            fs.unlinkSync( imagePath );
        }
    }

    const fileName = await uploadFile( req.files, undefined, collection );
    model.img = fileName;

    await model.save();

    res.json( model );

}

const updateImageCloudinary = async( req, res = response ) => {

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

    // Clean previously uploaded images
    if ( model.img ) {
        // Delete image from cloudinary
        const nameArr = model.img.split( '/' );
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split( '.' );
        cloudinary.uploader.destroy( public_id );

    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;

    await model.save();

    res.json( model );

}

const showImage = async( req, res = response ) => {

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

    // Clean previously uploaded images
    if ( model.img ) {
        // Delete image from server
        const imagePath = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( imagePath ) ) {
            return res.sendFile( imagePath );
        }
    }

    const noImagePath = path.join( __dirname, '../assets/no-image.jpeg' );
    res.sendFile( noImagePath );

}

module.exports = {
    loadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}