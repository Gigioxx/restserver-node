const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, fieldsValidation } = require('../middlewares');

const { createCategorie } = require('../controllers/categories');

const router = Router();

// {{url}}/api/categories

// Obtain all the categories - public
router.get('/', ( req, res ) => {
    res.json('get');
});

// Obtain a categorie - public
router.get('/:id', ( req, res ) => {
    res.json('get - id');
});

// Create categorie - private - only with valid token
router.post('/', [
    validateJWT,
    check( 'name', 'Name is required' ).not().isEmpty(),
    fieldsValidation
], createCategorie );

// Update register using id - private - only with valid token
router.put('/:id', ( req, res ) => {
    res.json('put');
});

// Delete a categorie - only admin
router.delete('/:id', ( req, res ) => {
    res.json('delete');
});

module.exports = router;