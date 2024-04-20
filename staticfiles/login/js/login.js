"use strict";
// DOM CONSTANTS
const register = document.querySelectorAll(".form-register");
const card = document.querySelector(".flip-card");
const modalPassword = document.querySelector(".modal-message");
const codeContainer = document.querySelector(".code-container");
const recoverContainer = document.querySelector(".recover-container");

const btnForgotPassword = document.querySelector(".form-forgot-password");
const btnRecoverPassword = document.querySelector(".btn-recover-password");
const btnLogin = document.querySelector(".btn-form-login");
const btnRegister = document.querySelector(".btn-form-register");

const formRecoverPassword = document.querySelector(".form-recover-password");
const formLogin = document.querySelector(".formLogin");
const formRegister = document.querySelector(".formRegister");

const inputPasswordRegister = document.querySelector("input[name=passwordR]");
const inputPasswordConfirmRegister = document.querySelector(
  "input[name=passwordC]"
);
const inputEmailRegister = document.querySelector("input[name=emailR]");

const divLoginError = document.querySelector(".login-error");

// CONSTANTS
const emailRecoverContent = ` <label for="email_recover" class="col-form-label w-100"
>Por favor ingresa tu correo:
</label>
<input
name="email_recover"
id="email_recover"
class="form-control form-control-lg fs-4" 
type="email"
required
/>`;

// Utility functions

function validateField(fieldName) {
  const field = document.querySelector(`input[name="${fieldName}"]`);

  if (field) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
    return true;
  }
}

function checkFormInputs(form) {
  for (const input of form.querySelectorAll("input")) {
    if (!validateField(input.name)) {
      return false;
    }
  }
  return true;
}

function checkPasswordsEqual(e) {
  if (inputPasswordRegister.value === inputPasswordConfirmRegister.value) {
    inputPasswordConfirmRegister.setCustomValidity("");
    return true;
  }
  inputPasswordConfirmRegister.setCustomValidity("Passwords don't match!");
  inputPasswordConfirmRegister.reportValidity();
  return false;
}

// Visual effects

Array.from(register).forEach((r) => {
  r.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.toggle("flipped");
  });
});

// Recover password

btnForgotPassword.addEventListener("click", () => {
  btnRecoverPassword.textContent = "Enviar código";
  recoverContainer.innerHTML = emailRecoverContent;
  codeContainer.innerHTML = "";
});

btnRecoverPassword.addEventListener("click", () => {
  if (document.querySelector("#code_recover")) {
    formRecoverPassword.submit();
  } else if (validateField("email_recover")) {
    const codeRecoverContent = ` <label for="code_recover" class="col-form-label w-100"
          >Ingresa el código que fue enviado a ${
            document.querySelector("#email_recover").value
          }:
          </label>
          <input
          type="text"
          name="code_recover"
          id="code_recover"
          class="form-control form-control-lg fs-4"
          required
          />`;

    btnRecoverPassword.textContent = "Recuperar contraseña";
    recoverContainer.innerHTML = "";
    codeContainer.innerHTML = codeRecoverContent;
  }
});
// Login form

// This event listener is triggered when the login button is clicked
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  divLoginError.classList.add("invisible");
  btnLogin.classList.add("placeholder");
  btnLogin.querySelector(".spinner-border").classList.remove("hidden");
  
  // Check if all form inputs are valid
  if (!checkFormInputs(formLogin)) {
    return;
  }

  // Create a new FormData object with the form data
  const formData = new FormData(formLogin);

  // Send a POST request to the server with the form data
  fetch(formLogin.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Check if the user is logged in
      if (data.logged_in) {
        // Redirect the user to the user page
        window.location.href = "/user/";
      } else {
        // Display an error message if login is unsuccessful
        divLoginError.classList.remove("invisible");
      }
    })
    .catch((error) => {
      // Log any errors that occur during the request
      console.error("Error:", error);
    })
    .finally(() => {
      btnLogin.classList.remove("placeholder");
      btnLogin.querySelector(".spinner-border").classList.add("hidden");
    });

 
});

// Register form

// This event listener is triggered when the password confirmation input changes
inputPasswordConfirmRegister.addEventListener("input", (e) =>
  checkPasswordsEqual(e)
);

// This event listener is triggered when the register button is clicked
btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  inputEmailRegister.setCustomValidity("");

  // Check if all form inputs are valid
  if (!checkFormInputs(formRegister)) {
    console.log("Invalid form inputs");
    return;
  }

  // Check if the passwords match
  if (!checkPasswordsEqual(e)) {
    return;
  }
 
  btnRegister.classList.add("placeholder");
  btnRegister.querySelector(".spinner-border").classList.remove("hidden");

  // Create a new FormData object with the form data
  const formData = new FormData(formRegister);

  // Send a POST request to the server with the form data
  fetch(formRegister.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Check if the user is registered
      console.log(data);
      if (data.registered) {
        // Redirect the user to the user page
        window.location.href = "/user/";
      } else {
        // Display an error message if registration is unsuccessful
        inputEmailRegister.setCustomValidity("Email already registered!");
        inputEmailRegister.reportValidity();
      }
    })
    .catch((error) => {
      // Log any errors that occur during the request
      console.error("Error:", error);
    }).finally(() => {
      btnRegister.classList.remove("placeholder");
      btnRegister.querySelector(".spinner-border").classList.add("hidden");
    });
});
