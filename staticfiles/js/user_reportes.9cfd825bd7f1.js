Array.from(document.getElementsByClassName('seguimiento_p')).forEach(function (element) {
    element.addEventListener('click', function () {
        console.log(this.closest('tr'));
        }); 
    });