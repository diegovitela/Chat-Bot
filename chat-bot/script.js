const messageBar = document.querySelector('.bar-wrapper input');
const sendBtn = document.querySelector('.bar-wrapper button');
const messageBox = document.querySelector('.message-box');  

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_Key = "TU_API_KEY";

function sendMessage() {
  if(messageBar.value.length > 0){
    const backgroundText = document.querySelector('.background-text');
    backgroundText.style.display = 'none';

    let userMessage = messageBar.value;

    let message = `
      <div class="chat message">
        <img src="user.jpg">
        <span>
          ${userMessage}  
        </span>
      </div>`;

    let response = `
      <div class="chat response responsive">
        <img src="chatbot.png">
        <span class = "new">...
        </span>
      </div>`;

    messageBox.insertAdjacentHTML('beforeend', message);
    messageBar.value = ''; 

    setTimeout(() => {
      messageBox.insertAdjacentHTML('beforeend', response);

      const requestOptions = { 
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_Key}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": userMessage}]
        })
      }

      fetch(API_URL, requestOptions).then(response => response.json()).then(data => {
        const ChatBotResponse = document.querySelector(".responsive .new");
        ChatBotResponse.innerHTML = data.choices[0].message.content;
        ChatBotResponse.classList.remove("new");
      }).catch(error => {
        const ChatBotResponse = document.querySelector(".responsive .new");
        ChatBotResponse.innerHTML = "Sorry, I didn't get that.";
      });

    }, 100);
  }
}

sendBtn.onclick = sendMessage;

messageBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();  
        sendMessage();
    }
});
