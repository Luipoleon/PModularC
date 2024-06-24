const currentUrl = window.location.href;
const url = new URL(currentUrl);
const modal_Eliminar = document.querySelector('#notificaciones_eliminar');
const btnEliminar = modal_Eliminar.querySelector('.eliminando_notificacion');
let idnotificacionglobal=0;
Array.from(
    document.getElementsByClassName('eliminar_notificacion')).forEach(
        function (element) {
            element.addEventListener('click', function () {
                idnotificacionglobal = this.id;
                btnEliminar.dataset.id = idnotificacionglobal;
                });
        });


btnEliminar.addEventListener('click', function () {
    let idNotificacion = idnotificacionglobal;
    const registro_actual = document.querySelector(`button[id="${idNotificacion}"]`).closest('tr');
    fetch(`/api_registros/notificacion/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({'id': `${idNotificacion}`}),
            })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
          registro_actual.remove();
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

const modal_mostrar = document.querySelector('#notificaciones_vista'); 
Array.from(
    document.querySelectorAll('tr')).forEach(
        function (element) {
            element.addEventListener('click', function () {
                modal_mostrar.querySelector('.modal-title-mostrar').textContent='Titulo: ' + this.querySelector('th').innerHTML;
                 const mensaje= 'Mensaje: ' + this.querySelectorAll('td').item(0).innerHTML;
                 const tipoMensaje= 'Tipo Mensaje: ' + this.querySelectorAll('td').item(1).innerHTML;
                 const fecha= 'Fecha de recibido: ' + this.querySelectorAll('td').item(2).innerHTML;
                 const hora= 'Hora: ' + this.querySelectorAll('td').item(3).innerHTML;

                 const contenido=`  <div>
                                    ${mensaje}
                                    ${tipoMensaje}
                                    ${fecha}
                                    ${hora}
                                    </div>`;
                modal_mostrar.querySelector('.modal-body-mostrar').innerHTML=contenido;
            });
        });
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var qValue = urlParams.get('id');
function isNumber(value) {
    return !isNaN(value) && value.trim() !== '';
}
if (qValue && isNumber(qValue)){
    document.querySelector('.vista'+ qValue).click();
}


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