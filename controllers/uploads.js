const { response } = require('express');
const { uploadFile } = require('../helpers');

const loadFile = async( req, res = response ) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    
    const fileName = await uploadFile( req.files );

    res.json({ fileName });

}

module.exports = {
    loadFile
}