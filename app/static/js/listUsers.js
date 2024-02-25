document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('listUsersForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const queryParams = new URLSearchParams(Object.fromEntries(formData.entries())).toString(); 

        fetch(`/apiV2/getUsers?${queryParams}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de networking');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if(data.personas && Array.isArray(data.personas) && data.personas.length > 0) {
                let mensaje = 'Usuarios listados correctamente:\n\n'; // Inicia el mensaje
                data.personas.forEach((persona, index) => {
                    // dsadsadas
                    mensaje += `Usuario ${index + 1}: ID=${persona.id}, Nombre=${persona.nombre}, Edad=${persona.edad}\n`;
                });
                alert(mensaje); // test
            } else {
                console.log('No se encontraron usuarios');
                alert('No se encontraron usuarios');
            }
            e.target.reset(); // Reinicia el formulario
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocurrió un error');u
        });
    });
});
