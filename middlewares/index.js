const fieldsValidation = require('../middlewares/fields-validation');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');
const fileValidation = require('../middlewares/file-validation');

module.exports = {
    ...fieldsValidation,
    ...validateJWT,
    ...validateRole,
    ...fileValidation
}