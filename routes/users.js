const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { fieldsValidation } = require('../middlewares/fields-validation');

const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers );

router.put('/:id', putUsers );

router.post('/', [
    check('name', 'Name must have a value').not().isEmpty(),
    check('password', 'Password must have a value and be greater than 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    // check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( async(role = '') => {
        const roleExists = await Role.findOne({ role });
        if ( !roleExists ) {
            throw new Error(`Role ${ role } is not registered in the database`);
        }
    }),
    fieldsValidation
], postUsers );

router.delete('/', deleteUsers );

router.patch('/', patchUsers );


module.exports = router;