import mv01 from "@/img/home/mv01.webp";
import mv02 from "@/img/home/mv02.webp";
import mv03 from "@/img/home/mv03.webp";
import "./style.scss";
import "@/assets/slick/slick.js";
import "@/scss/module/_carousel.scss";

let target_box = document.querySelector(".top-video");
let img_arr = [mv01, mv02, mv03];

function get_carousel_item() {
  let buffer_html = "";

  img_arr.forEach((item) => {
    let item_html = `<div class="item">
    <div class="scaling-container">
        <img src="${item}" alt="" />
    </div>
    </div>`;
    buffer_html += item_html;
  });

  return buffer_html;
}

function render_carousel_html() {
  let carousel_content = `<div class="banner-carousel-content slick">
        <div class="carousel-index">
        ${get_carousel_item()}
        </div>
        <span id="countdown"></span>
      </div>`;

  target_box.innerHTML = carousel_content;
}

render_carousel_html();

// 首頁背景輪播;
$(document).ready(function () {
  $(".carousel-index").slick({
    dots: false,
    infinite: true,
    speed: 4000,
    fade: true,
    cssEase: "linear",
    arrows: false,
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // 立刻切換圖片
  setTimeout(function () {
    $(".carousel-index").slick("slickGoTo", 1);
  }, 0);

  // 切換時 重置動畫
  $(".carousel-index").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    slick.$slides.eq(nextSlide).find("img").addClass("distant");

    countdown_animation();
  });

  $(".carousel-index").on("afterChange", function (event, slick, currentSlide) {
    slick.$slides.eq(currentSlide).find("img").removeClass("distant");
  });
});

// 計時條
let countdown = document.querySelector("#countdown");

function countdown_animation() {
  countdown.classList.add("countdown-progress");
  setTimeout(function () {
    countdown.classList.remove("countdown-progress");
  }, 7000);
}
