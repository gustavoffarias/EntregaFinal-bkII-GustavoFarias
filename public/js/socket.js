//handshake: configuramos el socket del front
const socket = io();

document.querySelector("#register").addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const photo = document.querySelector("#photo").value;

  const userDate = { name, email, password, photo };

  //creamos el nuevo usuario
  socket.emit("new user", userDate);
});

//socket.on("update users", (data) => {
//  data = data.map((each) => `<div>${each.name} - ${each.mail}</div>`).join("");
//  document.querySelector("#update").innerHTML = data;
//});
