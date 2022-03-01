const { response } = require('express');
const { Categorie } = require('../models')

const getCategories = async( req, res = response ) => {

    const { start = 0, limit = 5 } = req.query;
    const filter = { status: true }

    const [ total, categories ] = await Promise.all([
        Categorie.countDocuments( filter ),
        Categorie.find( filter )
            .populate( 'user', 'name' )
            .skip( Number(start) )
            .limit( Number(limit) )
    ]);
    
    res.json({
        total,
        categories
    });

}

// getCategorie - populate


const createCategorie = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categorieDB = await Categorie.findOne({ name });

    if ( categorieDB ) {
        res.status(400).json({
            msg: `Categorie ${ categorieDB.name } already exists!`
        });
    }

    // Generate data to save
    const data = {
        name,
        user: req.user._id
    }

    const categorie = await new Categorie( data );

    // Save in DB
    await categorie.save();

    res.status(201).json( categorie );

}

// updateCategorie

// deleteCategorie - status:false

module.exports = {
    getCategories,
    // getCategorie,
    createCategorie,
    // updateCategorie,
    // deleteCategorie
}