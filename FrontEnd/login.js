const form = document.querySelector(".login-form");
console.log(form);
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("HELLO");

  const data = new FormData(form);
  const email = data.get("email");
  const password = data.get("password");
  //   console.log(data);

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  console.log(response);

  if (response.ok) {
    const result = await response.json();

    sessionStorage.setItem("token", result.token);
    window.location = "index.html";
    console.log(result);
  } else {
    const errorLogin = document.querySelector(".login-error");
    errorLogin.style.visibility = "visible";
    console.log("ERROR ERROR ERORR SELF DESTRUCT INITIATED");
  }
});
