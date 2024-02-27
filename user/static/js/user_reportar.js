// Funcion Opciones tipo de edifio
let TipoEdificio = document.getElementById('TipoEdificio');
TipoEdificio.addEventListener('change', function() {
    if (TipoEdificio.value == 'Academico') {
        NombreEdificio.hidden = false;
        NumeroEdificio.hidden = false;
        TipoBaño.hidden = true;
        EdificioBaño.hidden = true;
        PlantaBaño.hidden = true;
        TipoAreasComunes.hidden = true;
        UAreaVerde.hidden = true;
        UAreaComedor.hidden = true;
        UAreaEstacionamiento.hidden = true;
    }else 
    if (TipoEdificio.value == 'Baños') {
        NombreEdificio.hidden = true;
        NumeroEdificio.hidden = true;
        TipoBaño.hidden = false;
        EdificioBaño.hidden = false;
        PlantaBaño.hidden = false;
        TipoAreasComunes.hidden = true;
        UAreaVerde.hidden = true;
        UAreaComedor.hidden = true;
        UAreaEstacionamiento.hidden = true;

    }else
    if (TipoEdificio.value == 'AreasComunes') {
        NombreEdificio.hidden = true;
        NumeroEdificio.hidden = true;
        TipoBaño.hidden = true;
        EdificioBaño.hidden = true;
        PlantaBaño.hidden = true;
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
    }else {
        NombreEdificio.hidden = true;
        NumeroEdificio.hidden = true;
        TipoBaño.hidden = true;
        EdificioBaño.hidden = true;
        PlantaBaño.hidden = true;
        TipoAreasComunes.hidden = true;
        UAreaVerde.hidden = true;
        UAreaComedor.hidden = true;
        UAreaEstacionamiento.hidden = true;
        
    }
});