const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validImageExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ], folder = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[ shortName.length - 1 ];

        // Validate file extension
        if ( !validImageExtensions.includes( extension ) ) {
            return reject( `${ extension } extension is not allowed, ${ validImageExtensions }` );
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err) {
                reject( err );
            }

            resolve( tempName );
        });

    });

}

module.exports = {
    uploadFile
}