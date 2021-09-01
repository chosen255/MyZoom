const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

// socket.addEventListener('message', async (message) => {
//   if (typeof message.data === 'string') {
//   console.log(`New message :`, message.data);
//   } else {
//   const messageText = await message.data.text();
//   console.log(messageText);
//   }
//   });

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

function handleSunmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSunmit);
nickForm.addEventListener("submit", handleNickSubmit);
