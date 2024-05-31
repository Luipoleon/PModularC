Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function (element) {
    element.addEventListener('click', function () {
        let datosUser = this.closest('tr');
        let idProblema = datosUser.querySelector('th').textContent;
        let statusProblema = datosUser.querySelector('td').textContent;
        const divAdminInfo = document.createElement("div");
        const divProblemaInfo = document.createElement("div");
        divAdminInfo.classList.add("AdminInfo","col")
        divProblemaInfo.classList.add("ProblemaInfo","col")
        // Definir variables para los colores correspondientes a cada estado del problema
        let colorEstatus = '';
        switch (statusProblema) {
            case "Aceptado":
                // Configurar el color para el estado "Aceptado"
                colorEstatus = 'bg-success text-white';
                break;
            case "Rechazado":
                // Configurar el color para el estado "Rechazado"
                colorEstatus = 'bg-danger text-white';
                break;
            case "Procesando":
                // Configurar el color para el estado "Procesando"
                colorEstatus = 'bg-warning text-dark';
                break;
            case "Completado":
                // Configurar el color para el estado "Completado"
                colorEstatus = 'bg-info text-white';
                break;
            default:
                // Manejar cualquier otro caso no especificado anteriormente
                break;
        }
        divAdminInfo.innerHTML =  `<div class='text-center h2'><strong>PROBLEMA #${idProblema}</strong></div>
        <div class='row h3'><span class='col border border-2'><strong>Estatus</strong></span> <span class='col border border-2 text-center ${colorEstatus}'>${statusProblema}</span></div>`;
        divProblemaInfo.innerHTML =  ` <div class= 'text-center h2'><strong>INFORMACION ENVIADA</strong></div>`;
        
        if (statusProblema === "Aceptado") {
            const baseUrl = `${url.origin}`;
            fetch(`${baseUrl}/user/reportes/aceptados?id=${idProblema}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Ponemos estos valores en null porque ya los tenemos arriba
                    data.ProblemasTabla.id = null; 
                    data.ProblemasTabla.estatus_problematica = null;
                    data.ProblemasTabla.id_usuario = null;
                    divAdminInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>Aceptado por</strong></span> <span class='col border border-2 text-center'>${data.adminName}</span></div>
                                                <div class='row h3'><span class='col border border-2'><strong>Fecha de aceptado</strong></span> <span class='col border border-2 text-center'>${data.fecha_aceptado.slice(0,10)}</span></div>
                                                <div class='row h3'><span class='col border border-2'><strong>Informacion adicional</strong></span> <span class='col border border-2 text-center'>${data.info_adicional}</span></div>`
                    Object.entries(data.ProblemasTabla).forEach(([clave, valor]) => {
                        if (valor != null) {
                            console.log(valor + clave);
                            if (clave == 'tipo_problema') {
                                let tipoColorTexto = '';
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
                                divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${clave}</strong></span> <span class='col border border-2 text-center ${tipoColorTexto}'>${valor}</span></div>`;
                                return;
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
                            // Impresión general para todas las demás claves y valores
                            divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${clave}</strong></span> <span class='col border border-2 text-center'>${valor}</span></div>`;
                        }
                    });
                                                
                                                
                                                
                                                
                    // Actualizar el contenido del modal aquí, después de que los datos se hayan obtenido
                    BodyModal.innerHTML = "";
                    BodyModal.insertAdjacentElement("afterbegin", divProblemaInfo);
                    BodyModal.insertAdjacentElement("afterbegin", divAdminInfo);
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }else if (statusProblema === "Procesando") {
            const baseUrl = `${url.origin}`;
            fetch(`${baseUrl}/user/reportes/aceptados?id=${idProblema}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Ponemos estos valores en null porque ya los tenemos arriba
                    data.ProblemasTabla.id = null; 
                    data.ProblemasTabla.estatus_problematica = null;
                    data.ProblemasTabla.id_usuario = null;
                    divAdminInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>Aceptado por</strong></span> <span class='col border border-2 text-center'>Pendiente</span></div>
                                                <div class='row h3'><span class='col border border-2'><strong>Fecha de aceptado</strong></span> <span class='col border border-2 text-center'>Pendiente</span></div>
                                                <div class='row h3'><span class='col border border-2'><strong>Informacion adicional</strong></span> <span class='col border border-2 text-center'>Pendiente</span></div>`
                    Object.entries(data.ProblemasTabla).forEach(([clave, valor]) => {
                        if (valor != null) {
                            console.log(valor + clave);
                            if (clave == 'tipo_problema') {
                                let tipoColorTexto = '';
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
                                divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${clave}</strong></span> <span class='col border border-2 text-center ${tipoColorTexto}'>${valor}</span></div>`;
                                return;
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
                            // Impresión general para todas las demás claves y valores
                            divProblemaInfo.innerHTML += `<div class='row h3'><span class='col border border-2'><strong>${clave}</strong></span> <span class='col border border-2 text-center'>${valor}</span></div>`;
                        }
                    });
                                                
                                                
                                                
                                                
                    // Actualizar el contenido del modal aquí, después de que los datos se hayan obtenido
                    BodyModal.innerHTML = "";
                    BodyModal.insertAdjacentElement("afterbegin", divProblemaInfo);
                    BodyModal.insertAdjacentElement("afterbegin", divAdminInfo);
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
        else {
            // Actualizar el contenido del modal inmediatamente si el estado no es "Aceptado"
            BodyModal.innerHTML = "";
            BodyModal.insertAdjacentHTML("afterbegin", content);
        }
    });
});


