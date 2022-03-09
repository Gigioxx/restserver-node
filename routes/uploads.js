const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation, fileValidation } = require('../middlewares');
const { loadFile, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post( '/', fileValidation, loadFile );

router.put( '/:collection/:id', [
    fileValidation,
    check('id', 'Id must be a mongoID').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    fieldsValidation
], updateImageCloudinary );

router.get( '/:collection/:id', [
    check('id', 'Id must be a mongoID').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    fieldsValidation
], showImage );

module.exports = router;