const { response } = require('express');

const getUsers = ( req, res = response ) => {
    res.json({
        message: 'get API - controller'
    });
}

const putUsers = ( req, res = response ) => {
    res.json({
        message: 'put API - controller'
    });
}

const postUsers = ( req, res = response ) => {
    res.json({
        message: 'post API - controller'
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