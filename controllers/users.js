const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = ( req = request, res = response ) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        message: 'get API - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const putUsers = ( req, res = response ) => {

    const { id } = req.params;

    res.json({
        message: 'put API - controller',
        id
    });
}

const postUsers = async( req, res = response ) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Verify if email exists
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        return res.status(400).json({
            msg: 'Email is already registered'
        });
    }

    // Password encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save in DB
    await user.save();

    res.json({
        user
    });
}

const deleteUsers = ( req, res = response ) => {
    res.json({
        message: 'delete API - controller'
    });
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