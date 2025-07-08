const form = document.querySelector(".login-form");

// login form submit event
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get form data
  const data = new FormData(form);
  const email = data.get("email");
  const password = data.get("password");

  // Post request to the API for login
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  // successful login
  if (response.ok) {
    const result = await response.json();

    // save login token and send user to the main page
    sessionStorage.setItem("token", result.token);
    window.location = "index.html";
    console.log(result);
  }
  // unsuccessful login
  else {
    // display login error
    const errorLogin = document.querySelector(".login-error");
    errorLogin.style.visibility = "visible";
    console.log("ERROR: Wrong email or password");
  }
});
