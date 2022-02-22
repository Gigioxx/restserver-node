
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers );

router.put('/:id', putUsers );

router.post('/', [
    check('email', 'Email is not valid').isEmail(),
], postUsers );

router.delete('/', deleteUsers );

router.patch('/', patchUsers );


module.exports = router;