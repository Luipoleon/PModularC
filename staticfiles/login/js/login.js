const register = document.querySelectorAll(".form-register");
const card = document.querySelector(".flip-card");

Array.from(register).forEach((r) => {
  r.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.toggle("flipped");
  });
});
