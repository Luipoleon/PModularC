// Funcion Opciones tipo de edifio
let TipoEdificio = document.getElementById('TipoEdificio');

function hideAllElements() {
    NombreEdificio.hidden = true;
    NumeroEdificio.hidden = true;
    TipoBaño.hidden = true;
    EdificioBaño.hidden = true;
    PlantaBaño.hidden = true;
    TipoAreasComunes.hidden = true;
    UAreaVerde.hidden = true;
    UAreaComedor.hidden = true;
    UAreaEstacionamiento.hidden = true;
    TipoDepartamento.hidden = true;
    UAdministrativos.hidden = true;
    UCubiculo.hidden = true;
    UBiblioteca.hidden = true;
    UCoordinacion.hidden = true;
  }


TipoEdificio.addEventListener('change', function() {
    if (TipoEdificio.value == 'Academico') {
        hideAllElements();
        NombreEdificio.hidden = false;
        NumeroEdificio.hidden = false;
    }else 
    if (TipoEdificio.value == 'Baños') {
        hideAllElements();
        TipoBaño.hidden = false;
        EdificioBaño.hidden = false;
        PlantaBaño.hidden = false;
    }else
    if (TipoEdificio.value == 'AreasComunes') {
        hideAllElements();
        TipoAreasComunes.hidden = false;

        document.getElementById('TipoAreaComun').addEventListener('change', function() {
            if (TipoAreaComun.value == 'AreaVerde') {
                UAreaVerde.hidden = false;
                UAreaComedor.hidden = true;
                UAreaEstacionamiento.hidden = true;
            }else if (TipoAreaComun.value == 'Comedor') {
                UAreaVerde.hidden = true;
                UAreaComedor.hidden = false;
                UAreaEstacionamiento.hidden = true;

            }else if (TipoAreaComun.value == 'Estacionamiento') {
                UAreaVerde.hidden = true;
                UAreaComedor.hidden = true;
                UAreaEstacionamiento.hidden = false;
                
            }else{
                UAreaVerde.hidden = true;
                UAreaComedor.hidden = true;
                UAreaEstacionamiento.hidden = true;
            }
        });
    }else if (TipoEdificio.value == 'Departamento') {
        hideAllElements();
        TipoDepartamento.hidden = false;
        document.getElementById('TipoDepartamentos').addEventListener('change', function() {
            if (TipoDepartamentos.value == 'Administrativos') {
                UAdministrativos.hidden = false;
                UCubiculo.hidden = true;
                UBiblioteca.hidden = true;
                UCoordinacion.hidden = true;
            }else if (TipoDepartamentos.value == 'Cubiculos') {
                UAdministrativos.hidden = true;
                UCubiculo.hidden = false;
                UBiblioteca.hidden = true;
                UCoordinacion.hidden = true;
            }else if (TipoDepartamentos.value == 'Biblioteca') {
                UAdministrativos.hidden = true;
                UCubiculo.hidden = true;
                UBiblioteca.hidden = false;
                UCoordinacion.hidden = true;
            }else if (TipoDepartamentos.value == 'Coordinacion') {
                UAdministrativos.hidden = true;
                UCubiculo.hidden = true;
                UBiblioteca.hidden = true;
                UCoordinacion.hidden = false;
            }else{
                UAdministrativos.hidden = true;
                UCubiculo.hidden = true;
                UBiblioteca.hidden = true;
                UCoordinacion.hidden = true;
            }
        });
    }
    
    else {
        hideAllElements();
    }
});