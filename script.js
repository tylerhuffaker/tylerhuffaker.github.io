// Replace 'YOUR_API_KEY' with your actual ChatGPT API key
const apiKey = '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';

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to send a message to the API and display the response
async function sendMessage(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }]
    })
  });

  const { choices } = await response.json();
  const reply = choices[0].message.content;

  displayMessage('User', message);
  displayMessage('ChatGPT', reply);
}

// Function to display a message in the chat container
function displayMessage(sender, content) {
  const messageElement = document.createElement('p');
  messageElement.innerHTML = `<strong>${sender}: </strong>${content}`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event listener for send button click
sendButton.addEventListener('click', () => {
  const message = userInput.value;
  if (message.trim() !== '') {
    displayMessage('You', message);
    sendMessage(message);
    userInput.value = '';
  }
});

// Event listener for Enter key press
userInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});
