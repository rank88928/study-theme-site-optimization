import "@/shared/common_style.js";
import "./style.scss";
//全域
import "@/components/index.js";
//單頁
import "./img_import.js";
import "@/page/aboutus/BannerCarousel/index.js";

import gsap from "gsap";

let anim_enable_size = 768;

let sections = document.querySelectorAll(".scroll-block");
let current_index = 0;
let isScrolling = false; // 防止滾動過快

function debounce() {
  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

function sections_anim_reset() {
  current_index = 0;
  isScrolling = false;

  sections.forEach((item) => {
    gsap.to(item, { width: "100%" });
  });
}

function left_changeSection() {
  if (isScrolling) return;
  isScrolling = true;

  if (current_index >= sections.length - 1) {
    isScrolling = false;
    return;
  }

  gsap.to(sections[current_index], { width: 0 });
  current_index += 1;
  debounce();
}

function right_changeSection() {
  if (isScrolling) return;
  isScrolling = true;

  if (current_index <= 0) {
    isScrolling = false;
    return;
  }
  current_index -= 1;
  gsap.to(sections[current_index], { width: "100%" });

  debounce();
}

window.addEventListener("wheel", (event) => {
  if (window.innerWidth <= anim_enable_size) {
    sections_anim_reset();
    return;
  }

  if (event.deltaY > 0) {
    left_changeSection();
  } else {
    right_changeSection();
  }
});

// 監聽手勢滑動 (手機)
// let startY = 0;
// window.addEventListener("touchstart", (event) => {
//   startY = event.touches[0].clientY;
// });
// window.addEventListener("touchmove", (event) => {
//   if (window.innerWidth <= anim_enable_size) {
//     sections_anim_reset();
//     return;
//   }

//   let deltaY = startY - event.touches[0].clientY;
//   if (Math.abs(deltaY) > 50) {
//     // 避免誤觸
//     changeSection(deltaY);
//     startY = event.touches[0].clientY;
//   }
// });
