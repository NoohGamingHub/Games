// Load messages from localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear existing messages

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';

        const usernameSpan = document.createElement('span');
        usernameSpan.textContent = msg.username;

        const messageText = document.createElement('p');
        messageText.textContent = msg.message;

        messageDiv.appendChild(usernameSpan);
        messageDiv.appendChild(messageText);
        messagesDiv.appendChild(messageDiv);
    });

    // Scroll to the latest message
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Save a new message to localStorage
function saveMessage(username, message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ username, message });
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Handle form submission
document.getElementById('message-form').addEventListener('submit', event => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('message').value.trim();

    if (username && message) {
        saveMessage(username, message);
        loadMessages(); // Reload messages to display the new one
        document.getElementById('message-form').reset(); // Clear the form
    }
});

// Initial load of messages
loadMessages();
