let BodyModal = document.querySelector('.modal-body');
let content = "";
const currentUrl = window.location.href;
const url = new URL(currentUrl); // obtiene ruta relativa

// Select current page on menu to add class 'MenuPicked'
const reportar = document.querySelectorAll('.nav-item a').item(1);
reportar.id = 'MenuPicked';

const btnStatusAceptar = document.createElement('button');
let idProblema;

const btnStatusRechazar = document.createElement('button');




const statusColors = {
    "Aceptado": 'bg-success text-white',
    "Rechazado": 'bg-danger text-white',
    "Procesando": 'bg-warning text-dark',
    "Completado": 'bg-info text-white'
};



Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function(element) {
    element.addEventListener('click', function() {
        let datosUser = this.closest('tr');
        let statusProblema = datosUser.querySelectorAll('td').item(2).textContent;
        const divAdminInfo = document.createElement("div");
        const divProblemaInfo = document.createElement("div");
        divAdminInfo.classList.add("AdminInfo", "col");
        divProblemaInfo.classList.add("ProblemaInfo", "col");

        let idProblema = datosUser.querySelector('th').textContent; // Utilizamos let para evitar problemas de alcance

        let colorEstatus = statusColors[statusProblema] || '';

        divAdminInfo.innerHTML = `
            <div class='text-center h2'><strong>PROBLEMA #${idProblema}</strong></div>
            <div class='row h3'><span class='col border border-2'><strong>Estatus</strong></span> <span class='col border border-2 text-center ${colorEstatus}'>${statusProblema}</span></div>
        `;
        divProblemaInfo.innerHTML = `<div class='text-center h2'><strong>INFORMACION ENVIADA</strong></div>`;

        if (["Aceptado", "Procesando", "Rechazado", "Completado"].includes(statusProblema)) {
            BodyModal.innerHTML = `<div id="loading" class="loading-container">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>`;
            const baseUrl = `${url.origin}`;

            fetch(`${baseUrl}/user/reportes/aceptados?id=${idProblema}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (statusProblema === "Aceptado") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Aceptado por</strong></span> <span class='col border border-2 text-center'>${data.adminName}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de aceptado</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0, 10)}</span></div>
                            <div class='row h3'>
                                <span class='col border border-2'><strong>Informacion adicional</strong></span> 
                                <textarea class='col border border-2 text-center'>${data.info_adicional}</textarea></div>
                        `;
                    } else if (statusProblema === "Procesando") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3 text-center'>
                                <span class='col border border-2'><strong>Informacion adicional</strong></span> 
                            </div>
                             <div class='row h3 text-start'>
                                <textarea class='col border border-2 text-center' placeholder="${data.info_adicional}"></textarea>
                            </div>
                            <div class='row h3 text-start'>

                                <button type="button" data-idProblema='${idProblema}' id="rechazar_problema" class="btn btn-danger col fs-5 me-2"  data-bs-dismiss="modal">
                                    Rechazar
                                </button>
                                
                                <button type="button" data-idProblema='${idProblema}' id="aceptar_problema"   class="btn btn-success col fs-5 me-2">
                                    Aceptar
                                 </button>
                            </div>
                        `;
                    } else if (statusProblema === "Rechazado") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Rechazado por</strong></span> <span class='col border border-2 text-center'>${data.adminName}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de rechazo</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Motivo de rechazo</strong></span> <span class='col border border-2 text-center'>${data.info_adicional}</span></div>
                        `;
                    } else if (statusProblema === "Completado") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Completado por</strong></span> <span class='col border border-2 text-center'>${data.adminName}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de completado</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Informacion adicional</strong></span> <span class='col border border-2 text-center'>${data.info_adicional}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de completado</strong></span> <span class='col border border-2 text-center text-success'>${data.fecha_completado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Informacion sobre completado</strong></span> <span class='col border border-2 text-center text-success'>${data.comentario_completado}</span></div>
                        `;
                    }

                    updateProblemInfo(divProblemaInfo, data.ProblemasTabla);
                    BodyModal.innerHTML = ""; // Limpiamos el contenido anterior
                    BodyModal.insertAdjacentElement("afterbegin", divProblemaInfo);
                    BodyModal.insertAdjacentElement("afterbegin", divAdminInfo);

                    // Configuramos los event listeners después de insertar los botones en el DOM
                    const btnStatusAceptar = document.querySelector('#aceptar_problema');
                    const btnStatusRechazar = document.querySelector('#rechazar_problema');

                    if (btnStatusAceptar) {
                        btnStatusAceptar.addEventListener('click', function() {
                        
                            fetch('/user/academico/sending-report/', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRFToken': getCookie('csrftoken')
                                },
                                body: JSON.stringify({ 
                                    id: idProblema,
                                    status: 'Aceptado',
                                    info_adicional: document.querySelector('textarea').value
                                 })
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                // Manejar la respuesta del servidor aquí
                            })
                            .catch(error => {
                                console.error('Hubo un problema con la operación fetch:', error);
                            });
                        });
                    }

                    if (btnStatusRechazar) {
                        btnStatusRechazar.addEventListener('click', function() {
                            // Event listener para el botón rechazar
                        });
                    }

                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    });
});

function updateProblemInfo(divProblemaInfo, ProblemasTabla) {
    ProblemasTabla.id = null;
    ProblemasTabla.estatus_problematica = null;
    ProblemasTabla.id_usuario = null;

    Object.entries(ProblemasTabla).forEach(([clave, valor]) => {
        if (valor != null) {
            let tipoColorTexto = '';
            if (clave == 'tipo_problema') {
                switch (valor) {
                    case 'Físico':
                        tipoColorTexto = 'text-brown';
                        break;
                    case 'Eléctrico':
                        tipoColorTexto = 'text-warning';
                        break;
                    default:
                        tipoColorTexto = '';
                }
            } else if (clave == 'gravedad_problema') {
                let colorTexto = '';
                let tiempoEstimado = '';
                switch (valor) {
                    case 'Menor':
                        colorTexto = 'text-success';
                        tiempoEstimado = '3-4 semanas';
                        break;
                    case 'Moderado':
                        colorTexto = 'text-warning';
                        tiempoEstimado = '2-3 semanas';
                        break;
                    case 'Serio':
                        colorTexto = 'text-primary';
                        tiempoEstimado = '5-12 días';
                        break;
                    case 'Crítico':
                        colorTexto = 'text-danger';
                        tiempoEstimado = '1-3 días';
                        break;
                    default:
                        colorTexto = '';
                        tiempoEstimado = '';
                }
                divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${clave}</strong></span> <span class='col border border-2 text-center ${colorTexto}'>${valor} | ${tiempoEstimado} |</span></div>`;
                return;
            }
            divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${clave}</strong></span> <span class='col border border-2 text-center ${tipoColorTexto}'>${valor}</span></div>`;
        }
    });
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