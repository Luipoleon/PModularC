'use strict';

// Get DOM elements
// Formulario de reporte
const formReporte = document.getElementById('formReport');

// Campos comunes
const tipoEdificioInput = document.getElementById('tipo_edificio');


// Academicos
const letraEdificio = document.getElementById('letraEdificio-container');
const numeroSalon = document.getElementById('numeroSalon-container');

// Baños
const tipoBaño = document.getElementById('tipoBaño-container');
const edificioBaño = document.getElementById('edificioBaño-container');
const pisoBaño = document.getElementById('pisoBaño-container');

// Areas Comunes
const tipoAreaComun = document.getElementById('tipoAreaComun-container');
const tipoAreaComunInput = document.getElementById('tipo_area_comun');
const ubicacionArea = document.getElementById('ubicacion_area-container');

// Departamentos
const tipoDepartamento = document.getElementById('tipoDepartamento-container');
const tipoDepartamentoInput = document.getElementById('tipo_departamento');
const tipoEdificioDepartamento = document.getElementById('tipoEdificioDepartamento-container');
const tipoEdificioDepartamentoInput = document.getElementById('tipo_edificio_departamento');
const ubicacionDepartamento = document.getElementById('ubicacionDepartamento-container');

// Modal

const btnAbrirModal = document.getElementById('btn-abrir-modal');
const datosEdificioModal = document.getElementById('datos_edificio_modal');
const datosProblemaModal = document.getElementById('datos_problema_modal');

// Opciones edificio departamento 

const opcionesEdificioDepartamento = {
    "Administrativos": 
     `<option value="" selected>Seleccionar</option>
      <option value="1">Oficina de Servicio Social</option>
      <option value="2">Oficina de Graduados</option>
      <option value="3">etc.</option>
      <option value="4">etc</option>
      <option value="5">etc</option>`,
    "Coordinacion":
    `<option value="" selected>Seleccionar</option>
     <option value="1">Computación</option>
     <option value="2">Electrónica</option>
     <option value="3"></option>`,
}

/**
 * Function to hide all form elements.
 */
function hideAllElements() {
    letraEdificio.hidden = true;
    numeroSalon.hidden = true;
    tipoBaño.hidden = true;
    edificioBaño.hidden = true;
    pisoBaño.hidden = true;
    tipoAreaComun.hidden = true;
    ubicacionArea.hidden = true;
    tipoDepartamento.hidden = true;
    ubicacionDepartamento.hidden = true;
    tipoEdificioDepartamento.hidden = true;
}

/** 
 * Reset values of all form elements.
*/

function resetAllElements() {
    Array.from(document.querySelectorAll('.mireportes textarea')).forEach(input => input.value = "");
    Array.from(document.querySelectorAll('.mireportes select')).forEach(input => {
        if (input.id !== 'tipo_edificio') {
            input.value = "";
        }
    });
}

/** 
 * Add data to the modal.
*/
function addDataToModal(datosEdificio, inputProblemas) {
    
    let htmlProblema = `<h3 class="datos_modal-titulo">Problema</h3>`; 
    let htmlEdificios = `<h3 class="datos_modal-titulo">Edificio</h3>`;

    datosEdificioModal.innerHTML = '';
    datosProblemaModal.innerHTML = '';

    inputProblemas.forEach((field) => {
        htmlProblema += `<p>${field.dataset.titulo} ${field.value}</p>`;
    });
 
    datosEdificio.forEach((field) => {
        htmlEdificios += `<p>${field.dataset.titulo} ${field.value}</p>`;
    });

    // Add to modal 
    datosEdificioModal.insertAdjacentHTML('beforeend', htmlEdificios);
    datosProblemaModal.insertAdjacentHTML('beforeend', htmlProblema);

}

/**
 * Event listener for the 'change' event on the tipoEdificio select element.
 * Handles the logic for showing/hiding form elements based on the selected value.
 */
tipoEdificioInput.addEventListener('change', function () {
    hideAllElements();
    resetAllElements();
    if (tipoEdificioInput.value == 'Academico') {
        letraEdificio.hidden = false;
        numeroSalon.hidden = false;
    } else if (tipoEdificioInput.value == 'Baños') {
        tipoBaño.hidden = false;
        edificioBaño.hidden = false;
        pisoBaño.hidden = false;
    } else if (tipoEdificioInput.value == 'AreasComunes') {
        tipoAreaComun.hidden = false;
        tipoAreaComunInput.addEventListener('change', function () {
            hideAllElements();
            tipoAreaComun.hidden = false;
            ubicacionArea.hidden = false;
        });
    } else if (tipoEdificioInput.value == 'Departamento') {
        tipoDepartamento.hidden = false;
        tipoDepartamentoInput.addEventListener('change', function () {
            hideAllElements();
            tipoDepartamento.hidden = false;
            if (tipoDepartamentoInput.value == 'Administrativos' 
                || tipoDepartamentoInput.value == 'Coordinacion') {
                tipoEdificioDepartamentoInput.innerHTML = opcionesEdificioDepartamento[tipoDepartamentoInput.value];
                tipoEdificioDepartamento.hidden = false;
            }
            else if(tipoDepartamentoInput.value == '') {
                return;
            }
            else {
               ubicacionDepartamento.hidden = false;
            } 
        });
    }
});

/**
 * Event listener for the 'click' event on the sendFormReportButton button.
 * Handles the logic for submitting the form based on the selected tipoEdificioInput value.
 */
btnAbrirModal.addEventListener('click', function () {
    const inputEdificios = Array.from(document.querySelectorAll('.mireportes select, .mireportes textarea'))
    .filter(input => !input.parentElement.hidden);
    
    const inputProblemas = Array.from(document.querySelectorAll('.mireportes1 select, .mireportes1 textarea'));
    addDataToModal(inputEdificios , inputProblemas);
});




// Call the hideAllElements function to hide all form elements
hideAllElements();

// Call the resetAllElements function to reset the values of all form elements
resetAllElements();

// Reset the value of the tipoEdificioInput select element
tipoEdificioInput.value = '';
