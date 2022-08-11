'use strict';

const express = require('express');
const { Router } = require('express');
const rep = Router();
const Replist = require('../Model/Reports');
const { check, validationResult } = require('express-validator');
const Repcontroller = require('../Controllers/Reports');
var { verifyToken } = require('../Config/funciones')


//Reporte Discriminado por tipo
rep.post('/ReporteT', verifyToken,
    [check('Tipo').isInt()],
    Repcontroller.RepoTipoDisc
)

//Reporte Total por tipo
rep.post('/ReporteT/total', verifyToken,
    [check('Tipo').isInt()],
    Repcontroller.RepoTipoTot
)

//Reporte Discriminado por fecha
rep.post('/ReporteF', verifyToken,
    [check('Fecha_Inicio').isDate(),
    check('Fecha_Fin').isDate()],
    Repcontroller.RepoFecDisc
)

//Reporte Total por fecha
rep.post('/ReporteF/total', verifyToken,
    [check('Fecha_Inicio').isDate(),
    check('Fecha_Fin').isDate()],
    Repcontroller.RepoFecTot
)


module.exports = rep;