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
const btnProblemaSiguiente = document.querySelector('#btn_problem_siguiente');
const btnProblemaAnterior = document.querySelector('#btn_problema_anterior');
const contenedorProblemas = document.querySelector('#contenedor_problemas');
let problemas, pagina = 1, numPages;
let problemasFiltrados;

// DOM filtro de problemas

const selectEstatus = document.querySelector('#estatus')
const selectGravedad = document.querySelector('#gravedad');
const selectTipoProblema = document.querySelector('#tipo_problema');
const selectTipoEdificio = document.querySelector('#tipo_edificio');
const selectFecha = document.querySelector('#fecha');
const selectReportesPorPagina = document.querySelector('#reportes_pagina');
const btnFiltrar = document.querySelector('#btn_filtrar');
const numResultados = document.querySelector('#num_resultados');

// DOM ordenar por
const thIdReporte = document.querySelector('#th_id_reporte');
const thFecha = document.querySelector('#th_fecha');

const statusColors = {
    "Aceptado": 'bg-success text-white',
    "Rechazado": 'bg-danger text-white',
    "Procesando": 'bg-warning text-dark',
    "Completado": 'bg-info text-white'
};

thIdReporte.addEventListener('click', (e) => {
    let orden = e.target.dataset.orden;
    if (orden === 'asc') {
        problemasFiltrados = problemasFiltrados.sort((a, b) => a.id - b.id);
        e.target.dataset.orden = 'desc';
    } else{
        problemasFiltrados = problemasFiltrados.sort((a, b) => b.id - a.id);
        e.target.dataset.orden = 'asc';
    }

    mostrarProblemas(pagina, problemasFiltrados, selectReportesPorPagina.value);
    addEvents();
});

thFecha.addEventListener('click', (e) => {
    let orden = e.target.dataset.orden;
    
    const parseFechaHora = (fechaHoraStr) => {
        const [fecha, hora] = fechaHoraStr.split(' ');
        const [dia, mes, anio] = fecha.split('/');
        const [horas, minutos, segundos] = hora.split(':');
        return new Date(anio, mes - 1, dia, horas, minutos, segundos);
    };
    
    if (orden === 'asc') {
        problemasFiltrados = problemasFiltrados.sort((a, b) => {
            const fechaA = parseFechaHora(a.fecha_actualizado);
            const fechaB = parseFechaHora(b.fecha_actualizado);
            return fechaA - fechaB;
        });
        e.target.dataset.orden = 'desc';
    } else {
        problemasFiltrados = problemasFiltrados.sort((a, b) => {
            const fechaA = parseFechaHora(a.fecha_actualizado);
            const fechaB = parseFechaHora(b.fecha_actualizado);
            return fechaB - fechaA;
        });
        e.target.dataset.orden = 'asc';
    }

    mostrarProblemas(pagina, problemasFiltrados, selectReportesPorPagina.value);
    addEvents();
});

function filtrar(){
    btnProblemaSiguiente.classList.add('invisible');
    btnProblemaAnterior.classList.add('invisible');

    problemasFiltrados = problemas;
    if (selectEstatus.value !== 'Todos') {
        problemasFiltrados = problemasFiltrados.filter(p => p.estatus_problematica === selectEstatus.value);
    }
    if (selectGravedad.value !== 'Todos') {
        problemasFiltrados = problemasFiltrados.filter(p => p.gravedad_problema === selectGravedad.value);
    }
    if (selectTipoProblema.value !== 'Todos') {
        problemasFiltrados = problemasFiltrados.filter(p => p.tipo_problema === selectTipoProblema.value);
    }
    if (selectTipoEdificio.value !== 'Todos') {
        problemasFiltrados = problemasFiltrados.filter(p => p.tipo_edificio === selectTipoEdificio.value);
    }
    if (selectFecha.value !== 'Todos') {
        // Filtrar por fecha de actualizacion del problema
        
        problemasFiltrados = problemasFiltrados.filter(p => {
            const fechaActual = new Date();
            const partesFecha = p.fecha_actualizado.split('/');
            const dia = parseInt(partesFecha[0], 10);
            const mes = parseInt(partesFecha[1], 10) - 1; // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
            const anio = parseInt(partesFecha[2], 10);
            const fechaActualizacion = new Date(year=anio, month=mes, date=dia);
            
            // Restar fecha actualizacion con fecha actual
            const diferencia = fechaActual - fechaActualizacion;
            const diasDiferencia = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            console.log(diferencia, diasDiferencia);

            if(selectFecha.value === 'Hoy') return diasDiferencia === 0;
            if(selectFecha.value === 'Ayer') return diasDiferencia === 1;
            if(selectFecha.value === '7 días') return diasDiferencia <= 7;
            if(selectFecha.value === 'Mes') return diasDiferencia <= 30;
            if(selectFecha.value === 'Año') return diasDiferencia <= 366;
            return true;
        });
    }
    
    numResultados.textContent = `${problemasFiltrados.length} resultados encontrados`;
    numPages = Math.ceil(problemasFiltrados.length / selectReportesPorPagina.value);
    pagina = 1;
    // Mostrar boton de siguient pagina si hay mas de una pagina
    if(numPages > 1) btnProblemaSiguiente.classList.remove('invisible');

    mostrarProblemas(pagina, problemasFiltrados, selectReportesPorPagina.value);
    addEvents();

}

btnFiltrar.addEventListener('click', filtrar);

// Event listener para los botones siguiente pagina

btnProblemaSiguiente.addEventListener('click', () => {
    btnProblemaAnterior.classList.remove('invisible');
    pagina++;
    if(pagina == numPages){
        btnProblemaSiguiente.classList.add('invisible');
    }
    mostrarProblemas(pagina, problemasFiltrados, selectReportesPorPagina.value);
    addEvents();
});

btnProblemaAnterior.addEventListener('click', () => {
    btnProblemaSiguiente.classList.remove('invisible');
    pagina--;
    if(pagina <= 1){
        btnProblemaAnterior.classList.add('invisible');
    }
    mostrarProblemas(pagina, problemasFiltrados, selectReportesPorPagina.value);
    addEvents();
});

function addEvents(){
    Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function(element) {
        element.addEventListener('click', function() {
            let datosUser = this.closest('tr');
            let statusProblema = datosUser.querySelectorAll('td').item(3).textContent;
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
    
                fetch(`/api_registros/problema_en_curso/${idProblema}/`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (statusProblema === "Aceptado") {
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
                                    
                                    <button type="button" data-idProblema='${idProblema}' id="aceptar_problema"   class="btn btn-success col fs-5 me-2" data-bs-dismiss="modal">
                                        Aceptar
                                     </button>
                                </div>
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
                                    
                                    <button type="button" data-idProblema='${idProblema}' id="aceptar_problema"   class="btn btn-success col fs-5 me-2" data-bs-dismiss="modal">
                                        Aceptar
                                     </button>
                                </div>
                            `;
                        } else if (statusProblema === "Rechazado") {
                            divAdminInfo.innerHTML += `
                                <div class='row h3 text-center'>
                                    <span class='col border border-2'><strong>Informacion adicional</strong></span> 
                                </div>
                                 <div class='row h3 text-start'>
                                    <textarea class='col border border-2 text-center' placeholder="${data.info_adicional}"></textarea>
                                </div>
                                <div class='row h3 text-start'>
    
                                    <button type="button" data-idProblema='${idProblema}' id="aceptar_problema"   class="btn btn-success col fs-5 me-2" data-bs-dismiss="modal">
                                        Aceptar
                                     </button>
                                </div>
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
    
                        updateProblemInfo(divProblemaInfo, data.problema);
                        BodyModal.innerHTML = ""; // Limpiamos el contenido anterior
                        BodyModal.insertAdjacentElement("afterbegin", divProblemaInfo);
                        BodyModal.insertAdjacentElement("afterbegin", divAdminInfo);
    
                        // Configuramos los event listeners después de insertar los botones en el DOM
                        const btnStatusAceptar = document.querySelector('#aceptar_problema');
                        const btnStatusRechazar = document.querySelector('#rechazar_problema');
    
                        if (btnStatusAceptar) {
                            btnStatusAceptar.addEventListener('click', function() {
                            
                                fetch(`/api_registros/problema/${idProblema}/`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': getCookie('csrftoken')
                                    },
                                    body: JSON.stringify({ 
                                        estatus: 'Aceptado',
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
                                    const problemaceptado = problemas.find(p=>p.id==idProblema);
                                    problemaceptado.estatus_problematica = 'Aceptado';
                                    const fecha_actual = new Date();
                                    const dia = fecha_actual.getDate();
                                    const mes = (fecha_actual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0, por lo que añadimos 1
                                    const anio = fecha_actual.getFullYear();
                                    const fechaStr = `${dia}/${mes}/${anio}`;
                                    problemaceptado.fecha_actualizado = fechaStr;
                                    filtrar();
                                })
                                .catch(error => {
                                    console.error('Hubo un problema con la operación fetch:', error);
                                });
                            });
                        }
    
                        if (btnStatusRechazar) {
                            btnStatusRechazar.addEventListener('click', function() {
                                // Event listener para el botón rechazar
                                fetch(`/api_registros/problema/${idProblema}/`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': getCookie('csrftoken')
                                    },
                                    body: JSON.stringify({ 
                                        estatus: 'Rechazado',
                                        info_adicional: document.querySelector('textarea').value
                                     })
                                })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    console.error('Hubo un problema con la operación fetch:', error);
                                });
                                
                            });
                        }
    
                    })
                    .catch((error) => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            }
        });
    });
}

// Cargar la información de los problemas en la tabla
function cargarProblemas() {
    fetch(`/api_registros/problema/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            problemas = data;
            problemasFiltrados = problemas;
            filtrar();
            addEvents();
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function mostrarProblemas(pagina=1, problemas=problemasFiltrados, problemasPorPagina=10){
    
    let problemasPagina = problemas.slice((pagina-1)*problemasPorPagina, pagina*problemasPorPagina);
    contenedorProblemas.innerHTML = "";
    problemasPagina.forEach((p) => {
        let tr = document.createElement('tr');
        let claseEstatus;
        
       // Condiciones en JavaScript para asignar el valor a claseEstatus
        if (p.estatus_problematica === 'Procesando') {
            claseEstatus = 'estatus-en-proceso';
        } else if (p.estatus_problematica === 'Aceptado') {
            claseEstatus = 'estatus-aceptado';
        } else if (p.estatus_problematica === 'Rechazado') {
            claseEstatus = 'estatus-rechazado';
        } else if (p.estatus_problematica === 'Completado') {
            claseEstatus = 'estatus-completado';
        }

        tr.classList.add(claseEstatus);

        tr.innerHTML = `
           <th scope="row row-9">${p.id}</th>
              <td>${p.user_name}#${p.id_usuario} </td>
              <td>${p.tipo_edificio} | ${p.tipo_problema}</td>
              <td>${p.gravedad_problema}</td>
              <td>${p.estatus_problematica}</td>
              <td>${p.fecha_actualizado}</td>
              <td>
                <button id="p.${p.id}" class="seguimiento_p btn btn-secondary" href="#!" data-bs-toggle="modal" data-bs-target="#InformacionReportes"> 
                  <i class="fa-solid fa-arrow-up-long"></i>
                </button>
              </td>
              <td>
                <input class="form-check-input" type="checkbox" name="option1" value="something">
                
              </td>
        `;
        contenedorProblemas.appendChild(tr);
    });
}

function updateProblemInfo(divProblemaInfo, problema) {
    problema.id = null;
    problema.estatus_problematica = null;
    problema.id_usuario = null;

    Object.entries(problema).forEach(([clave, valor]) => {
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

addEvents();
cargarProblemas();
