const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation } = require('../middlewares/fields-validation');
const { loadFile } = require('../controllers/uploads');

const router = Router();

router.post( '/', loadFile );

module.exports = router;