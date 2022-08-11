const Tipo = require('../Model/Tipo');
//const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator');
var {calc_price ,diference} = require('../Config/funciones') 
const jwt = require('jsonwebtoken');


// Mostrar todos los Tipos de vehiculo 
const getTipo = (req, res) => {
    Tipo.getTipo((err, data) => {
        res.status(200).json(data);
    });
}

//
const crearTipo = (req, res) => {
        const userData = {
            id: null,
            Tipo: req.body.Tipo,
            Precio_min: req.body.Precio_min

        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        Tipo.insertTipo(userData, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({
                    id: data.insertId,
                    Tipo: userData.Tipo,
                    Precio_min: userData.Precio_min,

                })
            } else {
                res.status(500).json({
                    success: false,
                    data: data.message
                })
            }
        })
    }

// Actualizar tipo vehiculo

const actualizarTipo = (req, res) => {
        const userData = {
            id: req.body.Id,
            Tipo: req.body.Tipo,
            Precio_min: req.body.Precio_min
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        Tipo.updateTipo(userData, (err, data) => {
            if (data) {
                res.status(200).json({data})
            } else {
                res.status(500).json({
                    success: false,
                    data: data.message
                })
            }
        })
    }


const registrotoken = (req, res) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

    var tokenData = {
        username: req.body.username
    }
    jwt.sign(tokenData, 'secret_key', {
        expiresIn: 60 * 15 //* 60 * 24
    }, (err, token) => {
        if (err) {
            res.status(500).json({ msg: 'Error' })
        }
        else {
            res.json({ msg: 'success', token: token })
        }
    })
};




module.exports = {
    getTipo,
    crearTipo,
    actualizarTipo,
    registrotoken
}