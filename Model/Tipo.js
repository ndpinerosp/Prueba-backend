const connection = require('../Config/Conexion')



let TipoModel = {};
TipoModel.getTipo = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM tipovehiculo ORDER BY id',
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

TipoModel.insertTipo = (roleData, callback) => {
    if (connection) {
        connection.query('SELECT * from tipovehiculo where Tipo=?', roleData.Tipo, function (error, results, fields) {
            console.log(error); // null
            console.log(results.length); // 1

            if (results.length == 1) {
                callback(null, {
                    'message': "Error Tipo existente"
                })
            }
            else {
                connection.query(
                    'INSERT INTO tipovehiculo SET ?', roleData,
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
        })
    }
}
TipoModel.updateTipo = (roleData, callback) => {
    if (connection) {
        const sql = `
        UPDATE tipovehiculo SET 
        Precio_min = ${connection.escape(roleData.Precio_min)},
        Tipo = ${connection.escape(roleData.tipo)}
         WHERE  id = ${connection.escape(roleData.Id)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                callback(null, {
                    "message": "Precio Actualizado"
                })
            }
        })
    };
}

/*
TipoModel.getRegistrocode = (roleData,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM registro where id=?',roleData.id,
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



*/


module.exports = TipoModel; 