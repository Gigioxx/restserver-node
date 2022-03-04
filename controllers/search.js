const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Categorie } = require('../models');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) {
        const user = await User.findById( term );
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i' );

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: users
    });
    
}

const searchCategories = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) {
        const categorie = await Categorie.findById( term );
        return res.json({
            results: ( categorie ) ? [ categorie ] : []
        });
    }
    
    const regex = new RegExp( term, 'i' );

    const categories = await Categorie.find({ name: regex, status: true });

    res.json({
        results: categories
    });

}

const search = ( req, res = response ) => {

    const { collection, term } = req.params;

    if ( !allowedCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `The allowed collections are: ${ allowedCollections }`
        });
    }

    switch ( collection ) {
        
        case 'users':
            searchUsers( term, res );
        break;

        case 'categories':
            searchCategories( term, res );
        break;

        case 'products':

        break;

        default:
            res.status(500).json({
                msg: 'This option is not available yet'
            });
    }

}

module.exports = {
    search
}