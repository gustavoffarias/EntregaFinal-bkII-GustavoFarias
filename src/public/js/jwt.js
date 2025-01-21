const form = document.getElementById("formJwt");
const inputEmail = document.getElementById("emailJwt");
const inputPassword = document.getElementById("passwordJwt");
const boton = document.getElementById("boton");

form.onsubmit = (e) => {
  e.preventDefault();
  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  fetch("http://localhost:8080/users/login", {
    method: "POST",

    body: JSON.stringify(user),

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("token", response.token);
    });
};

boton.onclick = () => {
  fetch("http://localhost:8080/users/private-headers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

boton.onclick = () => {
  fetch("http://localhost:8080/users/private-cookies");
};
