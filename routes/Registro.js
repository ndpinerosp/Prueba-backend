'use strict';

const express = require('express');
const { Router } = require('express');
const reg = Router();
const Regist = require('../Model/Registro');
const { check, validationResult } = require('express-validator');
const regcontroller = require('../Controllers/Registro');
var { verifyToken } = require('../Config/funciones')

reg.get('/registro', verifyToken,
    regcontroller.getallregister);


reg.post('/Ingreso', verifyToken, [
    check('Tipo').isInt(),
    check('Placa').isString()
],
    regcontroller.ingresovehiculo);

reg.post('/Salida', verifyToken, [
    check('Placa').isString(),
]
    , regcontroller.Salidavehiculo
);



module.exports = reg;