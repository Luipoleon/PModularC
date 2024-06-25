document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/api_registros/notificacion/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayNotifications(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
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
    return cookieValue;
}

function displayNotifications(notifications) {
    const notificationsContainer = document.getElementById('notifications-container');
    notifications = notifications.filter(input => !input.read_status);

    if(notifications.length === 0) {
        const notificationElement = document.createElement('li');
        notificationElement.classList.add('notification', 'list-group-item');
        notificationElement.innerHTML = `
            <a href='#'>
                <h3 class='fs-4'>No hay notificaciones</h3>
            </a>`;
        notificationsContainer.appendChild(notificationElement);
        return;
    }

    notifications.forEach(notification => {
        const notificationElement = document.createElement('li');
        const alertBell = document.querySelector('.bell');
        alertBell.classList.add('notifications');
        notificationElement.classList.add('notification', 'list-group-item');
        notificationElement.innerHTML = `
            <a href='#' id="">
                <h3 class='fs-4'>${notification.type}: ${notification.title}</h3>
                <p class='fs-5'>${notification.message.slice(0, 25)}...</p>
            </a>`;
       
        notificationsContainer.appendChild(notificationElement);

        notificationElement.addEventListener('click', () => {
            notificationsContainer.removeChild(notificationElement);
            if(notificationsContainer.children.length === 0) {
                const notificationElement = document.createElement('li');
                const alertBell = document.querySelector('.bell');

                alertBell.classList.remove('notifications');
                notificationElement.classList.add('notification', 'list-group-item');
                notificationElement.innerHTML = `
                    <a href='#'>
                        <h3 class='fs-4'>No hay notificaciones</h3>
                    </a>`;
                notificationsContainer.appendChild(notificationElement);
            }
            fetch(`/api_registros/notificacion/${notification.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  // Add this line
                },
            })
                .then(response => {
                    window.location = "/user/notificaciones?id="+notification.id;
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Notification read:', data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    });
}
