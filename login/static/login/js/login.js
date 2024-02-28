"use strict";
// DOM CONSTANTS
const register = document.querySelectorAll(".form-register");
const card = document.querySelector(".flip-card");
const modalPassword = document.querySelector(".modal-message");
const codeContainer = document.querySelector(".code-container");
const recoverContainer = document.querySelector(".recover-container");
const btnForgotPassword = document.querySelector(".form-forgot-password");
const btnRecoverPassword = document.querySelector(".btn-recover-password");
const formRecoverPassword = document.querySelector(".form-recover-password");

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

formRecoverPassword.addEventListener("submit", (event) => {
  event.preventDefault();
});
