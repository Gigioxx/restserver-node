const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async( req = request, res = response ) => {

    const { start = 0, limit = 5 } = req.query;
    const filter = { status: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments( filter ),
        User.find( filter )
            .skip( Number(start) )
            .limit( Number(limit) )
    ]);
    
    res.json({
        total,
        users
    });
}

const putUsers = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;

    if ( password ) {
        // Password encryption
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, data );

    res.json( user );
}

const postUsers = async( req, res = response ) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Password encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save in DB
    await user.save();

    res.json({
        user
    });
}

const deleteUsers = async( req, res = response ) => {

    const { id } = req.params;

    // Delete user from db PERMANENTLY
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { status: false } );

    res.json( user );
}

const patchUsers = ( req, res = response ) => {
    res.json({
        message: 'patch API - controller'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers
}