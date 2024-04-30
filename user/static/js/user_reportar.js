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

const myModal = new bootstrap.Modal(document.getElementById('datosReportarModal'));
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
function hideBuildingElements() {
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
 * Reset values of all building form.
*/

function resetBuildingElements() {
    Array.from(document.querySelectorAll('.mireportes textarea')).forEach(input => input.value = "");
    Array.from(document.querySelectorAll('.mireportes select')).forEach(input => {
        if (input.id !== 'tipo_edificio') {
            input.value = "";
        }
    });
}


/** 
 * Reset values of all building form.
*/
function resetAllElements() {
    Array.from(document.querySelectorAll('textarea, select')).forEach(input => input.value = "");
}


/**
 * Function to reportValidity of sent inputs
*/

function reportValidityInputs(inputs) {
    inputs.forEach((input) => {
        input.setCustomValidity("");
        if (!input.checkValidity()) {
            input.setCustomValidity("Este campo es requerido");
            input.reportValidity();
            return;
        }
    });
}


/** 
 * Add data to the modal.
*/
function addDataToModal(datosEdificio, inputProblemas) {
    
    let htmlProblema = `<h3 class="datos_modal-titulo fs-4">Problema</h3>`; 
    let htmlEdificios = `<h3 class="datos_modal-titulo fs-4">Edificio</h3>`;

    datosEdificioModal.innerHTML = '';
    datosProblemaModal.innerHTML = '';

    inputProblemas.forEach((field) => {
        htmlProblema += `<p class="fs-5"> <span class="fs-4 font-weight-bold">${field.dataset.titulo}</span> ${field.value}</p>`;
    });
 
    datosEdificio.forEach((field) => {
        htmlEdificios += `<p class="fs-5"> <span class="fs-4 font-weight-bold">${field.dataset.titulo}</span> ${field.value}</p>`;
    });

    // Add to modal 
    datosEdificioModal.insertAdjacentHTML('beforeend', htmlEdificios);
    datosProblemaModal.insertAdjacentHTML('beforeend', htmlProblema);

}

// Function to handle input change and show/hide elements
function handleInputChange(elementsToUnhide) {
    hideBuildingElements(); // Hide all form elements
    elementsToUnhide.forEach(element => element.hidden = false); // Unhide the selected elements
}

// Event listener for the 'change' event on the tipoEdificioInput select element
tipoEdificioInput.addEventListener('change', function () {
    let elementsToUnhide;
    if (tipoEdificioInput.value === 'Academico') {
        elementsToUnhide = [letraEdificio, numeroSalon]; // Additional element to unhide for Academicos
    } else if (tipoEdificioInput.value === 'Baños') {
        elementsToUnhide = [edificioBaño, pisoBaño, tipoBaño]; // Additional element to unhide for Baños
    } else if (tipoEdificioInput.value === 'Áreas comunes') {
        elementsToUnhide = [tipoAreaComun]; // Additional element to unhide for AreasComunes
    } else if (tipoEdificioInput.value === 'Departamento') {
        elementsToUnhide = [tipoDepartamento]; // Additional element to unhide for Departamento
    }
    handleInputChange(elementsToUnhide); // Call the handleInputChange function
});

// Event listener for the 'change' event on the tipoDepartamentoInput select element
tipoDepartamentoInput.addEventListener('change', function () {
    let elementToUnhide;
    if (tipoDepartamentoInput.value === 'Administrativos' || tipoDepartamentoInput.value === 'Coordinacion') {
        tipoEdificioDepartamentoInput.innerHTML = opcionesEdificioDepartamento[tipoDepartamentoInput.value];
        elementToUnhide = tipoEdificioDepartamento; // Additional element to unhide for Administrativos and Coordinacion
    } else if (tipoDepartamentoInput.value != '') {
        elementToUnhide = ubicacionDepartamento; // Additional element to unhide for other options
    }
    handleInputChange([tipoDepartamento, elementToUnhide]); // Call the handleInputChange function
});

// Event listener for the 'change' event on the tipoAreaComunInput select element
tipoAreaComunInput.addEventListener('change', function () {
    handleInputChange([tipoAreaComun, ubicacionArea]); // Call the handleInputChange function
});


/**
 * Event listener for the 'click' event on the sendFormReportButton button.
 * Handles the logic for submitting the form based on the selected tipoEdificioInput value.
 */
btnAbrirModal.addEventListener('click', function () {
  
    const inputEdificios = Array.from(document.querySelectorAll('.mireportes select, .mireportes textarea'))
        .filter(input => !input.parentElement.hidden);

    const inputProblemas = Array.from(document.querySelectorAll('.mireportes1 select, .mireportes1 textarea'));
    
    // Report validity of inputs
    reportValidityInputs([...inputEdificios, ...inputProblemas]);

    addDataToModal(inputEdificios, inputProblemas);

    // Open the modal if all fields are valid
    if (inputEdificios.every(field => field.checkValidity()) && inputProblemas.every(field => field.checkValidity())) {
        myModal.show();
    }
});


// Call the resetAllElements function to reset the values of all form elements
resetAllElements();
