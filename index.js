//Theme toggle button element
const themeToggleBtn = document.querySelector(".theme-toggle-btn");
const logo = document.querySelector(".logo");
//Navbar elements
const navbar = document.querySelector(".navbar");
const navbarList = document.querySelector(".navbar-list");
const sidebarBtn = document.querySelector(".burger-btn");
const navbarCloseBtn = document.querySelector(".navbar-close-btn");

//Function to handle open and close navbar
const toggleNavbar = () => {
  navbar.classList.toggle("hidden");
};

//Event listeners to open and close navbar
sidebarBtn.addEventListener("click", toggleNavbar);
navbarCloseBtn.addEventListener("click", toggleNavbar);

//Close navbar automaticly when navigate from one section to another
navbarList.addEventListener("click", (e) => {
  if (e.target.classList.contains("navbar__item")) {
    toggleNavbar();
  }
});


themeToggleBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);

  logo.setAttribute("src", `../assets/images/logo_${newTheme}.svg`);

  localStorage.setItem("theme", newTheme);
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
});
