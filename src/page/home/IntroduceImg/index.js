import "./style.scss";
import "@/assets/slick/slick.js";

const import_images = require.context("@/img/product", false, /\.jpg$/);
const images_arr = import_images.keys().map((file) => import_images(file));

let introduce_content = document.querySelector(".introduce-content");
let img_box = introduce_content.querySelectorAll(".img-box");
let carousel_box = document.querySelectorAll(".carousel-box");

(function render_img() {
  let index = 0;
  img_box.forEach((item) => {
    let buffer_html = "";
    let time = 0.5;

    for (let i = 0; i < 3; i++) {
      let html = `<img src="${images_arr[index]}" alt="" class="wow animate__animated animate__fadeInRight" data-wow-delay="${time}s" />`;
      time += 0.5;
      buffer_html += html;
      index++;
    }
    item.innerHTML = buffer_html;
  });
})();

(function render_carousel_img() {
  let index = 0;
  carousel_box.forEach((item) => {
    let buffer_html = "";

    for (let i = 0; i < 3; i++) {
      let html = `<div class="item">
                    <img src="${images_arr[index]}" alt="" class="" />
                  </div>`;
      buffer_html += html;
      index++;
    }
    item.innerHTML = buffer_html;
  });
})();

window.addEventListener("load", slick_viewport_response);
window.addEventListener("resize", slick_viewport_response);

function slick_viewport_response() {
  let width = window.innerWidth;

  if (width <= 768) {
    if (!$(".carousel-box").hasClass("slick-initialized")) {
      $(".carousel-box").slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear",
        arrows: false,
        adaptiveHeight: false,
      });
    }
  } else {
    if ($(".carousel-box").hasClass("slick-initialized")) {
      $(".carousel-box").slick("unslick");
    }
  }
}
