const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const plannerForm = document.querySelector("#planner-form");
const noteResult = document.querySelector("#note-result");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

plannerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(plannerForm);

  document.querySelector("#result-background").textContent = formData.get("background").trim();
  document.querySelector("#result-destination").textContent = formData.get("destination").trim();
  document.querySelector("#result-question").textContent = formData.get("first-question").trim();
  noteResult.hidden = false;
  noteResult.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#print-note").addEventListener("click", () => {
  window.print();
});
