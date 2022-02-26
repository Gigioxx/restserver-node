const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req = request , res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Read user related to the uid
        const user = await User.findById( uid );

        if ( !user ) {
            return res.status( 401 ).json({
                msg: 'Invalid token - user does not exist'
            });
        }

        // Verify if uid user has status = true
        if ( !user.status ) {
            return res.status( 401 ).json({
                msg: 'Invalid token - user status = false'
            });
        }

        req.user = user;
        next();
    } catch (error) {

        console.log( error );
        res.status(401).json({
            msg: 'Unvalid token'
        });
    }

}

module.exports = {
    validateJWT
}