//Header element
const header = document.querySelector(".header");
//Theme toggle button element
const themeToggleBtn = document.querySelector(".theme-toggle-btn");
const logo = document.querySelector(".logo");
//Navbar elements
const navbar = document.querySelector(".navbar");
const navbarList = document.querySelector(".navbar-list");
const navbarOpenBtn = document.querySelector(".burger-btn");
const navbarCloseBtn = document.querySelector(".navbar-close-btn");
const overlay = document.querySelector(".overlay");

//Function to handle open and close navbar
const toggleNavbar = () => {
  navbar.classList.toggle("hidden");
  overlay.classList.toggle("on");
  document.body.classList.toggle("no-scroll");
};

//Event listeners to open and close navbar
navbarOpenBtn.addEventListener("click", toggleNavbar);
navbarCloseBtn.addEventListener("click", toggleNavbar);

//Close navbar automaticly when navigate from one section to another
navbarList.addEventListener("click", (e) => {
  //Check if burger button display on the page and if on apply toggle navbar
  const isNavboarVisible =
    window.getComputedStyle(navbarOpenBtn).display !== "none";
  if (e.target.classList.contains("navbar__item") && isNavboarVisible) {
    toggleNavbar();
  }
});

//function to show header if we scroll to top and hide it if we scroll to bottom
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.style.transform = "translate(-50%,-100%)";
  } else {
    header.style.transform = "translate(-50%,0)";
  }

  lastScrollTop = scrollTop;
});

//function to close navbar if we click outside it
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !navbarOpenBtn.contains(e.target)) {
    navbar.classList.add("hidden");
    overlay.classList.remove("on");
    document.body.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }
});

themeToggleBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);

  const newLogo = `./assets/images/logo_${newTheme}.svg`;

  logo.src = newLogo;

  localStorage.setItem("theme", newTheme);
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    const newLogo = `./assets/images/logo_${savedTheme}.svg`;
    logo.src = newLogo;
  }
});
