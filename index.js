// Adaptive menu
const humburger = document.querySelector(".humburger");
const nav = document.querySelector(".nav");

function switchMenu() {
   humburger.classList.toggle("humburger--collapsed");
   nav.classList.toggle("nav--collapsed");
}
humburger.addEventListener("click", switchMenu);

function closeMenu(event) {
   if (event.target.classList.contains("nav__link")) {
      humburger.classList.remove("humburger--collapsed");
      nav.classList.remove("nav--collapsed");
   }
}
nav.addEventListener("click", closeMenu);

// Translate
const en = document.querySelector(".en");
const ru = document.querySelector(".ru");
let lang = "en";

function getTranslate(lng) {
   const i18nList = document.querySelectorAll("[data-i18n]");
   i18nList.forEach((el) => {
      if (el.placeholder) {
         el.placeholder = i18Obj[lng][el.dataset.i18n];
         el.value = "";
      }
      if (el.dataset.i18n === "portfolio-image-alt") {
         el.setAttribute("alt", i18Obj[lng][el.dataset.i18n]);
      }
      el.textContent = i18Obj[lng][el.dataset.i18n];
   });
   lang = lng;
}
en.addEventListener("click", () => getTranslate("en"));
ru.addEventListener("click", () => getTranslate("ru"));

function switchActiveClass(event) {
   en.classList.remove("lang-switcher__item-active");
   ru.classList.remove("lang-switcher__item-active");
   this.classList.add("lang-switcher__item-active");
}
en.addEventListener("click", switchActiveClass);
ru.addEventListener("click", switchActiveClass);

//change image
const portfolioBtns = document.querySelector(".portfolio-btns");
const portfolioItems = document.querySelector(".portfolio-items");

function changeImage(event) {
   if (event.target.classList.contains("btn")) {
      const portfolioBtnsArr = Array.from(portfolioBtns.children);
      portfolioBtnsArr.forEach((el) => {
         el.classList.add("btn--border");
         event.target.classList.remove("btn--border");
      });
      const portfolioImagesArr = Array.from(portfolioItems.children);
      portfolioImagesArr.forEach(
         (el, index) =>
            (el.src = `./assets/img/${event.target.dataset.i18n}/${
               index + 1
            }.jpg`)
      );
   }
}
portfolioBtns.addEventListener("click", changeImage);

// cache image
const seasons = ["winter", "spring", "summer", "autumn"];
function preloadImages() {
   seasons.forEach((el) => {
      for (let i = 1; i <= 6; i++) {
         const img = new Image();
         img.src = `./assets/img/${el}/${i}.jpg`;
      }
   });
}
preloadImages();

let isLight = false;
const themeSwitcher = document.querySelector(".theme-switcher");
const themeSwitcherIcon = document.querySelector(".theme-switcher__icon use");
const themeAll = document.querySelectorAll(".theme");
const body = document.querySelector("body");
const sectionTitleAll = document.querySelectorAll(".section-title");
const sectionTitleSpanAll = document.querySelectorAll(".section-title span");

function switchTheme() {
   if (!isLight) {
      themeAll.forEach((el) => el.classList.add("light-theme"));
      themeSwitcherIcon.href.baseVal = "./assets/svg/sprite.svg#light";

      isLight = true;
   } else {
      themeSwitcherIcon.href.baseVal = "./assets/svg/sprite.svg#dark";
      themeAll.forEach((el) => el.classList.remove("light-theme"));

      isLight = false;
   }
}
themeSwitcher.addEventListener("click", switchTheme);

//localStorage

function setLocalStorage() {
   localStorage.setItem("lang", lang);
   localStorage.setItem("theme", isLight ? "ligth" : "dark");
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
   lang = localStorage.getItem("lang");
   getTranslate(lang);
   if (localStorage.getItem("theme") === "ligth") {
      switchTheme();
   }
}

window.addEventListener("load", getLocalStorage);

console.log(
   "1) Смена изображений в секции portfolio +25;\n" +
      "2) Перевод страницы на два языка +25;\n" +
      "3) Переключение светлой и тёмной темы +25;\n" +
      "4) Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5;\n" +
      "5) Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5.\n"
);
