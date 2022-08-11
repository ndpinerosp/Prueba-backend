'use strict';


const { Router } = require('express');
const router = Router();
const Tipo = require('../Model/Tipo');
//const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator');
var { verifyToken } = require('../Config/funciones')
const jwt = require('jsonwebtoken');
const Tipocontroller = require('../Controllers/Tipo');

router.get('/tipo', verifyToken,
    Tipocontroller.getTipo
);


router.post('/tipo', verifyToken, [
    check('Tipo').isString(),
    check('Precio_min').isInt()]
    , Tipocontroller.crearTipo

);

router.post('/tipoup', verifyToken, [
    check('Id').isInt(),
    check('Tipo').isString(),
    check('Precio_min').isInt()
]
    , Tipocontroller.actualizarTipo
);


router.post('/api/signup',[
    check('Username').isString(),
],
    Tipocontroller.registrotoken
)

module.exports = router;