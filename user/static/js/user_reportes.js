let BodyModal = document.querySelector('.modal-body');
let content = "";
const currentUrl = window.location.href;
const url = new URL(currentUrl); // obtiene ruta relativa

// Select current page on menu to add class 'MenuPicked'
const reportar = document.querySelectorAll('.nav-item a').item(1);
reportar.id = 'MenuPicked';

const statusColors = {
    "Aceptado": 'bg-success text-white',
    "Rechazado": 'bg-danger text-white',
    "Procesando": 'bg-warning text-dark',
    "Completado": 'bg-info text-white'
};

Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function (element) {
    
    element.addEventListener('click', function () {
        let datosUser = this.closest('tr');
        let idProblema = datosUser.querySelector('th span').textContent;
        let statusProblema = datosUser.querySelectorAll('td').item(1).querySelector('span').textContent;
        const divAdminInfo = document.createElement("div");
        const divProblemaInfo = document.createElement("div");
        divAdminInfo.classList.add("AdminInfo", "col");
        divProblemaInfo.classList.add("ProblemaInfo", "col");

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
          
            fetch(`${baseUrl}/api_registros/problema_en_curso/${idProblema}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (statusProblema === "Aceptado") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Aceptado por</strong></span> <span class='col border border-2 text-center'>${data.id_administrador}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de aceptado</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Información adicional</strong></span> <span class='col border border-2 text-center'>${data.info_adicional}</span></div>
                        `;
                    } else if (statusProblema === "Procesando") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Aceptado por</strong></span> <span class='col border border-2 text-center'>Pendiente</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de aceptado</strong></span> <span class='col border border-2 text-center'>Pendiente</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Información adicional</strong></span> <span class='col border border-2 text-center'>Pendiente</span></div>
                        `;
                    } else if (statusProblema === "Rechazado") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Rechazado por</strong></span> <span class='col border border-2 text-center'>${data.id_administrador}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de rechazo</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Motivo de rechazo</strong></span> <span class='col border border-2 text-center'>${data.info_adicional}</span></div>
                        `;
                    } else if (statusProblema === "Completado") {
                        divAdminInfo.innerHTML += `
                            <div class='row h3'><span class='col border border-2'><strong>Completado por</strong></span> <span class='col border border-2 text-center'>${data.id_administrador}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de completado</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Información adicional</strong></span> <span class='col border border-2 text-center'>${data.info_adicional}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Fecha de completado</strong></span> <span class='col border border-2 text-center text-success'>${data.fecha_completado.slice(0, 10)}</span></div>
                            <div class='row h3'><span class='col border border-2'><strong>Información sobre completado</strong></span> <span class='col border border-2 text-center text-success'>${data.comentario_completado}</span></div>
                        

                        `;
                    }

                    updateProblemInfo(divProblemaInfo, data.problema);
                    BodyModal.innerHTML = "";
                    BodyModal.insertAdjacentElement("afterbegin", divProblemaInfo);
                    BodyModal.insertAdjacentElement("afterbegin", divAdminInfo);
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    });
});

function updateProblemInfo(divProblemaInfo, problema) {
    problema.id = null;
    problema.estatus_problematica = null;
    problema.id_usuario = null;

    // Diccionario para renombrar las claves
    const clavesRenombradas = {
        tipo_edificio: 'Tipo de Edificio',
        fecha_creacion: 'Fecha de Creación',
        fecha_actualizado: 'Ultima Actualización',
        letra_edificio: 'Letra del edificio',
        numero_salon: 'Numero de salon',
        piso_baño: 'Piso del Baño',
        tipo_baño: 'Tipo de Baño',
        edificio_baño: 'Edificio del Baño',
        tipo_area: 'Tipo de area',
        ubicacion_area: 'Ubicación del area',
        tipo_departamento: 'Tipo departamento',
        tipo_edificio_departamento: 'Nombre del departamento',
        ubicacion_departamento: 'Ubicación departamento',
        tipo_problema: 'Tipo de Problema',
        gravedad_problema: 'Gravedad',
        descripcion_problema: 'Descripción',
        ubicacion_exacta: 'Ubicación Exacta'
    };

    Object.entries(problema).forEach(([clave, valor]) => {
        if (valor != null) {
            let claveRenombrada = clavesRenombradas[clave] || clave;
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
                divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${claveRenombrada}</strong></span> <span class='col border border-2 text-center ${colorTexto}'>${valor} | ${tiempoEstimado} |</span></div>`;
                return;
            }
            divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${claveRenombrada}</strong></span> <span class='col border border-2 text-center ${tipoColorTexto}'>${valor}</span></div>`;
        }
    });
}

