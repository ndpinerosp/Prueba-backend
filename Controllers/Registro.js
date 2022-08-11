
const Regist = require('../Model/registro');
//const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator');
var {calc_price ,diference, time} = require('../Config/funciones') 

// Get 
const getallregister = (req, res) => {
    Regist.getRegistro((err, data) => {
        res.status(200).json(data);
    });
}

//Ingreso vehiculo

const ingresovehiculo = (req, res) => {

    const userData = {
        id: null,
        Tipo: req.body.Tipo,
        Placa: req.body.Placa,
        Ingreso: new Date()
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    Regist.insertRegistro(userData, (err, data) => {
        if (data && data.insertId) {
            res.status(200).json({
                id: data.insertId,
                Tipo: userData.Tipo,
                Placa: userData.Placa,
                Ingreso: userData.Ingreso

            })
        } else {
            res.status(500).json({
                success: false,
                data: data.message
            })
        }
    })
}

//Ingreso vehiculo
const Salidavehiculo = (req, res) => {


    const userData = {
        Placa: req.body.Placa,
        Salida: new Date()

    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    Regist.updateRegistro(userData, (err, data) => {
        if (data) {   
           const userData1 ={
                Tiempo: diference(data[0].Salida, data[0].Ingreso),
                Placa: data[0].Placa
           }
            Regist.updatetime(userData1, (err, data1) => {
                if (data1) {
                    
                res.status(200).json({
                    
                    Valor_Final: calc_price(data1[0].Tiempo,data1[0].Precio)+' COP',
                    Tiempo : time(userData1.Tiempo)
               
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    data: data1.message
                })
            }
            })

        } else {
            res.status(500).json({
                success: false,
                data: data.message
            })
        }
    })

}





module.exports = {
    getallregister,
    ingresovehiculo,
    Salidavehiculo
}