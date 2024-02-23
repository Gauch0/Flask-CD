document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createUserForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // fomulario
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // asdas
        fetch('/apiV2/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Se creo el usuario correctamente');
            e.target.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('A ocurrido un error');
        });
    });
});
