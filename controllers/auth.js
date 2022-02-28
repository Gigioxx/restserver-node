const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Check if email exists
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User or password incorrect - email'
            });
        }

        // Check  if user is active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User or password incorrect - estado: false'
            });
        }

        // Check if password is correct
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User or password incorrect - password'
            });
        }
        
        // Generate JWT
        const token = await generateJWT( user.id );


        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong, please contact the admin'
        });
    }
}

module.exports = {
    login
}