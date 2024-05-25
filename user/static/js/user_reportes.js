

// Select current page on menú to add class 'MenuPicked'

const reportar = document.querySelectorAll('.nav-item a').item(1);

reportar.id = 'MenuPicked';

Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function (element) {
    element.addEventListener('click', function () {
        console.log(this.closest('tr'));
        }); 
    });

