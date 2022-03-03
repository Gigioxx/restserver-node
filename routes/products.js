const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, fieldsValidation, isAdminRole } = require('../middlewares');

const { getProducts, getProductById, createProduct } = require('../controllers/products');
const { productByIdExists, categorieByIdExists } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/products

// get all products - public
router.get('/', getProducts );

// obtain a product - public
router.get('/:id', [
    check('id', 'ID is not a valid MongoID').isMongoId(),
    check('id').custom( productByIdExists ),
    fieldsValidation
], getProductById );

// create product - private - only with valid token
router.post('/', [
    validateJWT,
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'categorie', 'Id is not a MongoId' ).isMongoId(),
    check( 'categorie' ).custom( categorieByIdExists ),
    fieldsValidation
], createProduct );

// Update register using id - private - only with valid token
// router.put('/:id', [], updateProduct );

// Delete a product - only admin
// router.delete('/:id', [], deleteProduct );

module.exports = router;