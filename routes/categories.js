const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, fieldsValidation } = require('../middlewares');

const { getCategories, getCategorieById, createCategorie, updateCategorie } = require('../controllers/categories');
const { categorieByIdExists } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categories

// Obtain all the categories - public
router.get('/', getCategories );

// Obtain a categorie - public
router.get('/:id', [
    check('id', 'ID is not a valid MongoID').isMongoId(),
    check('id').custom( categorieByIdExists ),
    fieldsValidation
], getCategorieById );

// Create categorie - private - only with valid token
router.post('/', [
    validateJWT,
    check( 'name', 'Name is required' ).not().isEmpty(),
    fieldsValidation
], createCategorie );

// Update register using id - private - only with valid token
router.put('/:id', [
    validateJWT,
    check( 'name', 'Name is required' ).not().isEmpty(),
    check('id').custom( categorieByIdExists ),
    fieldsValidation
], updateCategorie );

// Delete a categorie - only admin
router.delete('/:id', ( req, res ) => {
    res.json('delete');
});

module.exports = router;