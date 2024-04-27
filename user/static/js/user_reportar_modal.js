// Select all input elements

const sendFormReport = document.getElementById('sendFormReport');
const formReporte = document.getElementById('formReport');



sendFormReport.addEventListener('click', function() {
    const textAreas = Array.from(document.querySelectorAll('textarea'))
    .filter(input => !input.parentElement.hidden);
    const selects = Array.from(document.querySelectorAll('select'))
    .filter(input => !input.parentElement.hidden);

    if (TipoEdificio.value === 'AreasComunes') {
        
       
    }
    else if(TipoEdificio.value === 'Departamento') {
     
    }
    else if(TipoEdificio.value === 'Academico' ){
    
    }   
    else if(TipoEdificio.value === 'Baños') {
        
    }
    else{
        return;
    }


});


