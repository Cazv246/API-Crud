const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',      // Dirección del servidor MySQL
    user: 'root',           // Usuario de la base de datos
    password: '1234', // Contraseña del usuario
    database: 'dealer_db'   // Nombre de la base de datos
});

// Conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta básica para la raíz del servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas de la API CRUD
// Obtener todos los vehículos
app.get('/api/vehiculos', (req, res) => {
    db.query('SELECT * FROM vehiculos', (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json(results);
    });
});

// Insertar un nuevo vehículo
app.post('/api/vehiculos', (req, res) => {
    const { marca, modelo, anio, precio } = req.body;
    const query = 'INSERT INTO vehiculos (marca, modelo, anio, precio) VALUES (?, ?, ?, ?)';
    db.query(query, [marca, modelo, anio, precio], (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Vehículo agregado correctamente' });
    });
});

// Editar un vehículo
app.put('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, precio } = req.body;
    const query = 'UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, precio = ? WHERE id = ?';
    db.query(query, [marca, modelo, anio, precio, id], (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Vehículo actualizado correctamente' });
    });
});

// Eliminar un vehículo
app.delete('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM vehiculos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Vehículo eliminado correctamente' });
    });
});

// Servidor en ejecución
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
