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

Array.from(register).forEach((r) => {
  r.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.toggle("flipped");
  });
});

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

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (!checkFormInputs(formLogin)) {
    return;
  }

  const formData = new FormData(formLogin);

  fetch(formLogin.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.logged_in) {
        window.location.href = "/user/";
      } else {
        divLoginError.classList.remove("invisible");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();

  inputPasswordConfirmRegister.setCustomValidity("");
  inputEmailRegister.setCustomValidity("");

  if (!checkFormInputs(formRegister)) {
    return;
  }

  if (inputPasswordRegister.value !== inputPasswordConfirmRegister.value) {
    inputPasswordConfirmRegister.setCustomValidity("Passwords don't match!");
    inputPasswordConfirmRegister.reportValidity();
    return;
  }

  const formData = new FormData(formRegister);

  fetch(formRegister.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.registered) {
        window.location.href = "/user/";
      } else {
        inputEmailRegister.setCustomValidity("Email already registered!");
        inputEmailRegister.reportValidity();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
