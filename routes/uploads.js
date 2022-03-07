const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation } = require('../middlewares/fields-validation');
const { loadFile, updateImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post( '/', loadFile );

router.put( '/:collection/:id', [
    check('id', 'Id must be a mongoID').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    fieldsValidation
], updateImage );

module.exports = router;