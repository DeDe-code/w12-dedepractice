const rootElement = document.querySelector("#root");
const imagesComponent = (title, url) => `
  <div class="swiper-slide">
    <div class="firstSlide">
      <h3 class="title">${title}</h3>
      <img src="public/img${url}"/>
    </div>
  </div>
  `;
const swiperWrapElement = document.querySelector(".swiper-wrapper");

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

fetch(`/images`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      swiperWrapElement.insertAdjacentHTML(
        "beforeend",
        imagesComponent(element.title, element.url)
      );
    });
  });
