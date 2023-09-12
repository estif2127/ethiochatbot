const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Define intents and their associated responses
const intents = {
  'greeting': {
    userInputs: ['ሰላም', 'እንደምን ነህ', 'አንደምን፡አመሸህ' 'ጤና ይስጥልኝ' ],
    responses: ['ሰላም!', 'እንዴት ነሽ?',  'ደህና ነኝ አንተስ እንዴት ነህ'],
  },
  'how_are_you': {
    userInputs: ['እንዴት ነሽ?', 'እንዴት ነህ?'],
    responses: ['አኔ ደህና ነኝ።', 'እያለን ነው።', 'በእውቀት ነኝ።'],
  },
  'thanks': {
    userInputs: ['አመሰግናለሁ'],
    responses: ['አመሰግናለሁ!', 'መልስ ነው።'],
  },
  'default': {
    responses: ['ምን ለማለት አንደፈላክ አልገባኝም።', 'አልገባኝም'],
  },
};

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = userInput.value.trim().toLowerCase();
  if (!userMessage) return;

  // Add user message to chat box
  appendMessage('User', userMessage);

  // Determine the user's intent based on their input
  const intent = getIntent(userMessage);

  // Choose a random response from the intent's responses
  const aiResponse = getRandomResponse(intent);

  // Add AI response to chat box
  setTimeout(() => {
    appendMessage('AI', `AI: ${aiResponse}`);
  }, 500); // Simulate AI response delay

  // Clear the user input
  userInput.value = '';
}

function getIntent(userMessage) {
  // Loop through intents and check if user input matches any intent's userInputs
  for (const [intentName, intent] of Object.entries(intents)) {
    if (intent.userInputs && intent.userInputs.includes(userMessage)) {
      return intentName;
    }
  }
  // Default intent if no match is found
  return 'default';
}

function getRandomResponse(intent) {
  // Get a random response from the intent's responses
  const responses = intents[intent].responses;
  return responses[Math.floor(Math.random() * responses.length)];
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender.toLowerCase());
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
}
