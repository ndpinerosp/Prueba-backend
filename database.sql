
CREATE DATABASE IF NOT EXISTS Estacionamiento;
use Estacionamiento;

CREATE TABLE tipovehiculo (
id INT NOT NULL AUTO_INCREMENT ,
 Tipo VARCHAR(500) NOT NULL , 
 Precio_min INT NOT NULL ,
 PRIMARY KEY (`id`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE estacionamiento.registro (
id INT NOT NULL AUTO_INCREMENT ,
 Tipo INT NOT NULL ,
 Placa VARCHAR(7) NOT NULL ,
 Ingreso DATETIME NOT NULL ,
 Salida DATETIME NULL , 
 Tiempo INT ,
 PRIMARY KEY (id)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
 
ALTER TABLE `registro` ADD FOREIGN KEY (`Tipo`) REFERENCES `tipovehiculo`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;