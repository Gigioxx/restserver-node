const { response, request } = require('express');

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

const postUsers = ( req, res = response ) => {

    const { name, age } = req.body;  

    res.json({
        message: 'post API - controller',
        name,
        age
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