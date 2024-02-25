document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deleteUserForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userId = formData.get('id');

        fetch(`/apiV2/deleteUser/${userId}`, {
            method: 'DELETE',
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
            alert('Usuario eliminado correctamente');
            e.target.reset(); // Reinicia el formulario
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocurrió un error');
        });
    });
});
