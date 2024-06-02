document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/user/notificaciones')
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

function displayNotifications(notifications) {
    const notificationsContainer = document.getElementById('notifications-container');
    notifications.forEach(notification => {
        const notificationElement = document.createElement('li');
        notificationElement.classList.add('notification', 'list-group-item');
        notificationElement.innerHTML = `
            <a href='#'>
                <h3>${notification.title}</h3>
                <p>${notification.message}</p>
                <small>${new Date(notification.created_at).toLocaleString()}</small>
            </a>`;
        notificationsContainer.appendChild(notificationElement);
    });
}
