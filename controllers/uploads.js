const path = require('path');

const { response } = require('express');

const loadFile = ( req, res = response ) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    
    const { file } = req.files;
    const uploadPath = path.join( __dirname, '../uploads/', file.name );

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }

        res.json({ msg: 'File uploaded to ' + uploadPath });
    });

}

module.exports = {
    loadFile
}