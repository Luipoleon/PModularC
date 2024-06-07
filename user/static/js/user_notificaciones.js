const currentUrl = window.location.href;
const url = new URL(currentUrl); // obtiene ruta relativa
Array.from(
    document.getElementsByClassName('eliminar_notificacion')).forEach(
        function (element) {
            element.addEventListener('click', function () {
                let idNotificacion = this.id;
                console.log(idNotificacion);
                const baseUrl = `${url.origin}`;
                fetch(`${baseUrl}/user/notificaciones`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    // body: JSON.stringify({'id': `${idNotificacion}`}),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.success) {
                            this.closest('tr').remove();
                        }
                    })
                    .catch((error) => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            });
        });
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }