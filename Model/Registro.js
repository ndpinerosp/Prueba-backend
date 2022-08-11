//const mysql = require('mysql');


/*connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});*/
const connection = require('../Config/Conexion')



let RegistroModel = {};
RegistroModel.getRegistro = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM registro ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}

RegistroModel.insertRegistro = (roleData, callback) => {
    if (connection) {
        connection.query('SELECT * from registro where ingreso is not null and salida is not null and Placa=?', roleData.Placa, function (error, results, fields) {
            console.log(error); // null
            console.log(results.length); // 1

            if (results.length == 1) {
                callback(null, {
                    'message': "El vehiculo se encuentra estacionado"
                })
            }
            else {
                connection.query(
                    'SELECT * from tipovehiculo where id=?', roleData.Tipo, function (error, results, fields) {
                        if (results.length == 0) {
                            callback(null, {
                                'message': "Tipo de vehiculo no existe"
                            })
                        }
                        else {

                            connection.query(
                                'INSERT INTO registro SET ?', roleData,
                                (err, result) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        callback(null, {
                                            'insertId': result.insertId
                                        })
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
        )

    }
}
RegistroModel.updateRegistro = (roleData, callback) => {
    if (connection) {

        const sql = `
        UPDATE registro SET 
        Salida = ${connection.escape(roleData.Salida)}
         WHERE Placa = ${connection.escape(roleData.Placa)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                connection.query(
                    'SELECT * FROM registro where Placa=?', roleData.Placa,
                    (err, rows) => {
                        if (err) {
                            throw err
                        } else {
                            callback(null, rows)
                        }
                    }
                )
            }
        })
    }
}


RegistroModel.updatetime = (roleData, callback) => {
    if (connection) {
        const sql = `
        UPDATE registro SET 
        Tiempo = ${connection.escape(roleData.Tiempo)}
         WHERE Placa = ${connection.escape(roleData.Placa)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                connection.query(
                    'SELECT Tiempo,Precio_min as Precio FROM registro inner join tipovehiculo on registro.Tipo = tipovehiculo.id where Placa=?', roleData.Placa,
                    (err, rows) => {
                        if (err) {
                            throw err
                        } else {
                            callback(null, rows)
                        }
                    }
                )
            }
        })
    };
}


RegistroModel.getRegistrocode = (roleData, callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM registro where Placa=?', roleData.Placa,
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}







module.exports = RegistroModel; 