(function () {
  const container = document.createElement('div');
  container.id = 'chatbot-container';
  container.innerHTML = `
    <div id="chat-header">Ask Palm Bay 🌴</div>
    <div id="chat-messages"></div>
    <input id="chat-input" placeholder="Ask about the website..." />
  `;
  document.body.appendChild(container);

  const input = container.querySelector('#chat-input');
  const messages = container.querySelector('#chat-messages');

  input.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;
    const userMsg = input.value.trim();
    if (!userMsg) return;

    appendMessage('You', userMsg);
    input.value = '';

    const res = await fetch('https://your-backend-url.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg })
    });

    const data = await res.json();
    appendMessage('Bot', data.reply);
  });

  function appendMessage(sender, msg) {
    const div = document.createElement('div');
    div.textContent = `${sender}: ${msg}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
})();
