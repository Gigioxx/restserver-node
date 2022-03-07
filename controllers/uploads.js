const { response } = require('express');
const { uploadFile } = require('../helpers');

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


    res.json({ id, collection });

}

module.exports = {
    loadFile,
    updateImage
}