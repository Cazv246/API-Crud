const apiUrl = 'http://localhost:3000/api';

// Referencias a los elementos del DOM
const form = document.getElementById('form-insertar');
const tablaCuerpo = document.getElementById('tabla-cuerpo');

// Evento para insertar un nuevo vehículo
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const anio = document.getElementById('anio').value.trim();
    const precio = document.getElementById('precio').value.trim();

    if (!marca || !modelo || !anio || !precio) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const data = { marca, modelo, anio, precio };

    fetch(`${apiUrl}/vehiculos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        form.reset();
        cargarInventario();
    })
    .catch(error => console.error('Error:', error));
});

// Función para cargar el inventario de vehículos
function cargarInventario() {
    fetch(`${apiUrl}/vehiculos`)
        .then(response => response.json())
        .then(data => {
            tablaCuerpo.innerHTML = '';
            data.forEach(vehiculo => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${vehiculo.id}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.anio}</td>
                    <td>${vehiculo.precio}</td>
                    <td>
                        <button class="editar" onclick="editarVehiculo(${vehiculo.id})">Editar</button>
                        <button class="eliminar" onclick="eliminarVehiculo(${vehiculo.id})">Eliminar</button>
                    </td>
                `;
                tablaCuerpo.appendChild(fila);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para eliminar un vehículo
function eliminarVehiculo(id) {
    if (!confirm('Estás seguro de que deseas eliminar este vehículo?')) return;

    fetch(`${apiUrl}/vehiculos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        cargarInventario();
    })
    .catch(error => console.error('Error:', error));
}

// Función para editar un vehículo
function editarVehiculo(id) {
    const marca = prompt('Ingrese la nueva marca:');
    const modelo = prompt('Ingrese el nuevo modelo:');
    const anio = prompt('Ingrese el nuevo año:');
    const precio = prompt('Ingrese el nuevo precio:');

    if (!marca || !modelo || !anio || !precio) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const data = { marca, modelo, anio, precio };

    fetch(`${apiUrl}/vehiculos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        cargarInventario();
    })
    .catch(error => console.error('Error:', error));
}

// Cargar el inventario al cargar la página
window.onload = cargarInventario;
