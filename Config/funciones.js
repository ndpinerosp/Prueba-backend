const jwt = require('jsonwebtoken');

function calc_price(time, price) {

    var total = time * price
    return total;

}

function diference(Tinit, Tfinal) {
    var final = Math.abs(Tfinal.getTime() - Tinit.getTime());
    let minutes = Math.ceil(final / (1000 * 60));
    return minutes;
}

// Muestra el tiempo en formato de horas y minutos
function time(minutes) {
    var Horas = Math.trunc(minutes / 60)
    var min = Math.trunc(minutes % 60)
    return Horas + " Horas " + min + " minutos";
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// No permite la fecha inicial superior a la fecha final 

function compareDate(Fini, FFinal) {
    Fini = new Date(Fini)
    FFinal = new Date(FFinal)
    console.log(Fini, FFinal)
    if (Fini.getTime() > FFinal.getTime()) {
        return false
    }
    else if (Fini.getTime() <= FFinal.getTime()) {
        return true
    }

}

//Verificacion de Token JWT

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "secret_key", (err, user) => {
        if (err) {
            res.status(401).json({
                error: 'Token inválido'
            })
        }
        req.user = user;
        next();
    });
}


module.exports = {
    calc_price,
    diference,
    time,
    addDays,
    compareDate,
    verifyToken
}