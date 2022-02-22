const { response, request } = require('express');
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

    const body = req.body;
    const user = new User( body );

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