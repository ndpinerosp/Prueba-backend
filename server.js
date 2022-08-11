const { urlencoded } = require("express");
const express = require("express");

var app = express()

var port = process.env.PORT || 3000  // establecemos nuestro puerto

//middleware 

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//rutas

app.use('/api', require('./routes/Registro'))
app.use('/api', require('./routes/Tipo'))
app.use('/api', require('./routes/Reports'))






// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)