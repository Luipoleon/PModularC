Array.from(
    document.getElementsByClassName('eliminar_notificacion')).forEach(
        function (element) {
            element.addEventListener('click', function () {
                // let idNotificacion = this.closest('li').dataset.id;
                // const baseUrl = `${url.origin}`;
                // fetch(`${baseUrl}/user/notificaciones/eliminar?id=${idNotificacion}`)
                //     .then((response) => {
                //         if (!response.ok) {
                //             throw new Error('Network response was not ok');
                //         }
                //         return response.json();
                //     })
                //     .then((data) => {
                //         if (data.success) {
                //             this.closest('li').remove();
                //         }
                //     })
                //     .catch((error) => {
                //         console.error('There was a problem with the fetch operation:', error);
                //     });
            });
        });