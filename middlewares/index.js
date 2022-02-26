const fieldsValidation = require('../middlewares/fields-validation');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports = {
    ...fieldsValidation,
    ...validateJWT,
    ...validateRole
}