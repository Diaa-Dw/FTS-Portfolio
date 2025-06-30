//Header element
const header = document.querySelector(".header");
//Theme toggle button element
const themeToggleBtn = document.querySelector(".theme-toggle-btn");
const lightThemeIcon = document.querySelector(".light-theme");
const darkThemeIcon = document.querySelector(".dark-theme");
const logo = document.querySelector(".logo");
//Navbar elements
const navbar = document.querySelector(".navbar");
const navbarList = document.querySelector(".navbar-list");
const navbarOpenBtn = document.querySelector(".burger-btn");
const navbarCloseBtn = document.querySelector(".navbar-close-btn");
const overlay = document.querySelector(".overlay");

function setLogoForTheme(theme) {
  if (theme === "light") {
    logo.src = "./assets/images/logo_light.svg";
  } else {
    logo.src = "./assets/images/logo_dark.svg";
  }
}

//It will show the user prefereance theme if there is not it will display dark mode ass default
const loadSavedThme = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  setLogoForTheme(savedTheme);
  themeIconSwitchHandler(savedTheme);
};

//Function to switch theme icon depends on current theme
const themeIconSwitchHandler = (theme) => {
  if (theme === "light") {
    darkThemeIcon.classList.add("active");
    lightThemeIcon.classList.remove("active");
  } else {
    lightThemeIcon.classList.add("active");
    darkThemeIcon.classList.remove("active");
  }
};
// It will toggle between dark and light theme
const toggleTheme = (e) => {
  e.preventDefault();
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  setLogoForTheme(newTheme);
  themeIconSwitchHandler(newTheme);
  localStorage.setItem("theme", newTheme);
};

//It will run loadSavedTheme after loading the page
window.addEventListener("load", loadSavedThme);

// Allow toggle_theme_button to toggle between themes
themeToggleBtn.addEventListener("click", toggleTheme);

//Function to handle open and close navbar
const toggleNavbar = () => {
  //Check if burger button display on the page and if on apply toggle navbar
  navbar.classList.toggle("hidden");
  overlay.classList.toggle("on");
  document.body.classList.toggle("no-scroll");
};

//Function to close navbar automaticly if user click outside navbar
const clickOutsideNavbarHandler = (e) => {
  if (!navbar.contains(e.target) && !navbarOpenBtn.contains(e.target)) {
    navbar.classList.add("hidden");
    overlay.classList.remove("on");
    document.body.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }
};

// function to show and hide header depends on user scroll
let lastScrollTop = 0;
const handleHeaderVisibility = () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.style.transform = "translate(-50%,-100%)";
  } else {
    header.style.transform = "translate(-50%,0)";
  }

  lastScrollTop = scrollTop;
};
//Event listeners to open and close navbar
navbarOpenBtn.addEventListener("click", toggleNavbar);
navbarCloseBtn.addEventListener("click", toggleNavbar);
//Close navbar automaticly when click to navbar item
navbarList.addEventListener("click", (e) => {
  const isNavbarVisible =
    window.getComputedStyle(navbarOpenBtn).display !== "none";

  if (e.target.classList.contains("navbar__item") && isNavbarVisible) {
    toggleNavbar();
  }
});
//Event to close navbar if we click outside it
document.addEventListener("click", clickOutsideNavbarHandler);

//Event to show header if we scroll to top and hide it if we scroll to bottom
window.addEventListener("scroll", handleHeaderVisibility);
