const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation, validateJWT } = require('../middlewares/');

const { login, googleSignIn, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidation
], login );

router.post('/google', [
    check('id_token', 'Google token is required').not().isEmpty(),
    fieldsValidation
], googleSignIn );

router.get('/', validateJWT, renewToken );

module.exports = router;