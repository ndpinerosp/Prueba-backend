const Replist = require('../Model/Reports');
//const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator');
var {time,addDays,compareDate} = require('../Config/funciones') 


//Reporte Discriminado por tipo

const RepoTipoDisc = (req, res) => {

    const userData = {
        Tipo: req.body.Tipo,
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    Replist.getTipodiscr(userData, (err, data) => {
        if (data) {
            res.status(200).json(data)

        }
    })
}

//Reporte Total por tipo

const RepoTipoTot = (req, res) => {

    const userData = {
        Tipo: req.body.Tipo,
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    Replist.getTipototal(userData, (err, data) => {
        if (data) {
            res.status(200).json(data)
        }
    })
}


//Reporte Discriminado por fecha

const RepoFecDisc = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var compare = compareDate(req.body.Fecha_Inicio, req.body.Fecha_Fin)
    if (compare) {
        var a = addDays(req.body.Fecha_Fin, 1)
        const userData = {
            Fecha_Inicio: req.body.Fecha_Inicio,
            Fecha_Fin: a
        }

        Replist.getFechadiscr(userData, (err, data) => {
            if (data) {
               
                res.status(200).json(data)

            }
        })
    }
    else {
        res.status(500).json({
            "success": false,
            "data": "La fecha inicial no puede superar la fecha final "
        })
    }
}


//Reporte Total por fecha
const RepoFecTot = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var compare = compareDate(req.body.Fecha_Inicio, req.body.Fecha_Fin)
    if (compare) {
        var a = addDays(req.body.Fecha_Fin, 1)
        const userData = {
            Fecha_Inicio: req.body.Fecha_Inicio,
            Fecha_Fin: a
        }

        Replist.getFechatotal(userData, (err, data) => {
            if (data) {
                res.status(200).json(data)
            }
        })

    } else {
        res.status(500).json({
            "success": false,
            "data": "La fecha inicial no puede superar la fecha final "
        })
    }
}


module.exports = {
    RepoTipoDisc,
    RepoTipoTot,
    RepoFecDisc,
    RepoFecTot
}