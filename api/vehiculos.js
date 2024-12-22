

const db = require('server'); 


class Vehiculo {
    constructor(marca, modelo, anio, precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.precio = precio;
    }

  
    static crear(vehiculo, callback) {
        const query = 'INSERT INTO vehiculos (marca, modelo, anio, precio) VALUES (?, ?, ?, ?)';
        db.query(query, [vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.precio], (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }

  
    static obtenerTodos(callback) {
        const query = 'SELECT * FROM vehiculos';
        db.query(query, (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }


    static obtenerPorId(id, callback) {
        const query = 'SELECT * FROM vehiculos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            callback(null, result[0]);
        });
    }


    static actualizar(id, vehiculo, callback) {
        const query = 'UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, precio = ? WHERE id = ?';
        db.query(query, [vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.precio, id], (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }

    static eliminar(id, callback) {
        const query = 'DELETE FROM vehiculos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }
}

module.exports = Vehiculo;
