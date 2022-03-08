const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation, fileValidation } = require('../middlewares');
const { loadFile, updateImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post( '/', fileValidation, loadFile );

router.put( '/:collection/:id', [
    fileValidation,
    check('id', 'Id must be a mongoID').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    fieldsValidation
], updateImage );

module.exports = router;