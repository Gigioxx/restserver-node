const { response } = require('express');
const { Categorie } = require('../models')


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

module.exports = {
    createCategorie,
}