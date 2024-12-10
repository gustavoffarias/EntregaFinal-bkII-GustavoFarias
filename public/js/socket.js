//handshake: configuramos el socket del front
const socket = io();

document.querySelector("#register").addEventListener("click", () => {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const age = document.querySelector("#age").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const userDate = { firstName, lastName, age, email, password };

  //creamos el nuevo usuario
  socket.emit("new user", userDate);
});

//socket.on("update users", (data) => {
//  data = data.map((each) => `<div>${each.name} - ${each.mail}</div>`).join("");
//  document.querySelector("#update").innerHTML = data;
//});
