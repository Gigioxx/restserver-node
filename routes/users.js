const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, roleIn } = require('../middlewares/validate-role');

const { isValidRole, emailExists, userByIdExists } = require('../helpers/db-validators');

const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers );

router.put('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( userByIdExists ),
    check('role').custom( isValidRole ),
    fieldsValidation
], putUsers );

router.post('/', [
    check('name', 'Name must have a value').not().isEmpty(),
    check('password', 'Password must have a value and be greater than 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    fieldsValidation
], postUsers );

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    roleIn('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( userByIdExists ),
    fieldsValidation
], deleteUsers );

router.patch('/', patchUsers );


module.exports = router;