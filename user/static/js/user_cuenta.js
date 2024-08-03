// Solicitud PUT para actualizar la información de la cuenta de usuario

// Cambiar contraseña con solicitud PUT

const inputCurrentPassword = document.getElementById('currentPassword');
const inputNewPassword = document.getElementById('newPassword');
const btnOpenModalPassword = document.getElementById('btnOpenModalPassword');

const btnChangePassword = document.getElementById('btnChangePassword');
const placeholder = btnChangePassword.querySelector('.spinner-border');
const messageModal = document.querySelector('.modal-message'); 

btnOpenModalPassword.addEventListener('click', () => {
    messageModal.classList.add('d-none');
    inputCurrentPassword.value = '';
    inputNewPassword.value = '';
    newPassword.value = '';
});

btnChangePassword.addEventListener('click', async () => {

    btnChangePassword.classList.add('pe-5', 'disabled');
    placeholder.classList.remove('d-none');

    const currentPassword = inputCurrentPassword.value;
    const newPassword = inputNewPassword.value;

    const response = await fetch('/api_registros/usuario/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            current_password: currentPassword,
            password: newPassword
        })
    });
    
    messageModal.classList.remove('d-none');
    if (response.ok) {
        messageModal.innerHTML = 'Contraseña cambiada correctamente';
        inputCurrentPassword.value = '';
        inputNewPassword.value = '';
        newPassword.value = '';
    } else {
        messageModal.innerHTML = 'Error al cambiar la contraseña';
    }

    placeholder.classList.add('d-none');
    btnChangePassword.classList.remove('pe-5', 'disabled');
 
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}