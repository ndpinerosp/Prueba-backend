const connection = require('../Config/Conexion')

let ReportModel = {};

ReportModel.getTipodiscr = (roleData, callback) => {
    if (connection) {
        connection.query(
            'select registro.id as Id ,registro.Placa as Placa,Ingreso,Salida,Tiempo,tipovehiculo.Tipo as Tipo,Tiempo*tipovehiculo.Precio_min as Total_Pagado from registro INNER JOIN tipovehiculo on registro.Tipo=tipovehiculo.id where registro.tipo=? ', roleData.Tipo,
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

ReportModel.getTipototal = (roleData, callback) => {
    if (connection) {
        connection.query(
            'SELECT count(registro.id) as Vehiculos_Estacionados, sum(Tiempo*tipovehiculo.Precio_min) as Total_Recaudado FROM `registro` INNER join tipovehiculo on tipovehiculo.id= registro.tipo WHERE registro.tipo=?', roleData.Tipo,
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

ReportModel.getFechadiscr = (roleData, callback) => {
    if (connection) {
        connection.query(
            'select registro.id as Id ,registro.Placa as Placa,Ingreso,Salida,Tiempo,tipovehiculo.Tipo as Tipo,Tiempo*tipovehiculo.Precio_min as Total_Pagado from registro INNER JOIN tipovehiculo on registro.Tipo=tipovehiculo.id where registro.ingreso between ? and ?  ',[roleData.Fecha_Inicio, roleData.Fecha_Fin] ,
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

ReportModel.getFechatotal = (roleData, callback) => {
    if (connection) {
        connection.query(
            'SELECT count(registro.id) as Vehiculos_Estacionados, sum(Tiempo*tipovehiculo.Precio_min) as Total_Recaudado FROM `registro` INNER join tipovehiculo on tipovehiculo.id= registro.tipo where registro.ingreso between ? and ?  ',[roleData.Fecha_Inicio, roleData.Fecha_Fin] ,
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
module.exports  = ReportModel