let BodyModal = document.querySelector('.modal-body');
let content = "";
const currentUrl = window.location.href;
const url = new URL(currentUrl); // obtiene ruta relativa

Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function (element) {
    element.addEventListener('click', function () {
        let datosUser = this.closest('tr');
        let idProblema = datosUser.querySelector('th').textContent;
        let statusProblema = datosUser.querySelector('td').textContent;
        const divAdminInfo = document.createElement("div");
        const divProblemaInfo = document.createElement("div");
        divAdminInfo.classList.add("AdminInfo","col")
        divProblemaInfo.classList.add("ProblemaInfo","col")
        divAdminInfo.innerHTML =  ` <div>Problema ${idProblema}</div>
                                    <div class='row'><span class='col'>Estatus</span> <span class='col'>${statusProblema}</span></div>`;
        
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
                    divAdminInfo.innerHTML += `<div class='row'><span class='col'>Estatus</span> <span class='col'>${data.adminName}</span></div>
                                                <div class='row'><span class='col'>Estatus</span> <span class='col'>${data.fecha_aceptado.slice(0,10)}</span></div>
                                                <div class='row'><span class='col'>Estatus</span> <span class='col'>${data.info_adicional}</span></div>`
                    Object.entries(data.ProblemasTabla).forEach(([clave, valor]) => {
                        if (valor != null){
                            console.log(`Clave: ${clave}, Valor: ${valor}`);
                            divProblemaInfo.innerHTML += `<div>${valor}</div>`
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
        } else {
            // Actualizar el contenido del modal inmediatamente si el estado no es "Aceptado"
            BodyModal.innerHTML = "";
            BodyModal.insertAdjacentHTML("afterbegin", content);
        }
    });
});
