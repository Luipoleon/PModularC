
let TipoEdificio = document.getElementById('TipoEdificio');
let NombreEdificio = document.getElementById('NombreEdificio');
let NumeroEdificio = document.getElementById('NumeroEdificio');

TipoEdificio.addEventListener('change', function() {
    if (TipoEdificio.value == 'Academico') {
        NombreEdificio.hidden = false;
        NumeroEdificio.hidden = false;
    } else {
        NombreEdificio.hidden = true;
        NumeroEdificio.hidden = true;
    }
});