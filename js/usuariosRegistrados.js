// Función para cargar usuarios desde el backend
async function loadUsers() {
    try {
        const response = await fetch('http://localhost:4567/all-users');
        const users = await response.json();
        const tableBody = document.getElementById('userTableBody');

        // Limpiar el contenido existente
        tableBody.innerHTML = '';

        // Insertar los datos de los usuarios
        users.forEach(user => {
            const row = `
            <tr>
              <th scope="row">${user.id}</th>
              <td>${user.username}</td>
              <td>${user.fullName || 'N/A'}</td> <!-- Full name puede ser null -->
              <td>${user.email}</td>
              <td>${user.createdAt}</td> <!-- Puedes mostrar otras propiedades -->
            </tr>
          `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
}

window.onload = loadUsers;
