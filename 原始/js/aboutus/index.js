import { load_gsap } from "../utils/gsap/loadgsap.js";
import "../shopping/cart_box.js";
import "../module/index.js";

let anim_enable_size = 768;

(async () => {
  await load_gsap();

  //背景圖與文字切換
  (function () {
    let banner_carousel_config = {
      btn: document.querySelectorAll(".banner-btn"),
      bk_img: document.querySelectorAll(".banner-img"),
      txt: [document.querySelectorAll(".title-first"), document.querySelectorAll(".title-second"), document.querySelectorAll(".vertical-slogan")],
      current_index: 0, //預設第一張
      stabilization: 0, //防抖
    };
    //動畫參數
    let animation_config = {
      txt_fade_out: "inset(0% 0% 100% 0%)",
      txt_fade_in: "inset(0% 0% 0% 0%)",
      txt_duration: 0.2,
    };

    //把文字dom重新分組 每組第i項各為一組
    function txt_map(data) {
      let new_arr = [];

      for (let i = 0; i < data[0].length; i++) {
        //按第一標語數量劃分
        let sub_arr = [];

        for (let k = 0; k < data.length; k++) {
          sub_arr.push(data[k][i]);
        }

        new_arr.push(sub_arr);
      }
      return new_arr;
      //有更好的方式 數組當中的map函數
    }

    //按鈕active css切換
    function btn_active(i) {
      let btn = banner_carousel_config.btn;
      Array.from(btn).forEach(function (item) {
        item.classList.remove("active");
      });
      btn[i].classList.add("active");
    }

    //文字動畫
    function text_transition(settings, index) {
      let t = gsap.timeline();
      txt_dom[index].forEach(function (item) {
        t.to(item, {
          clipPath: settings,
          duration: animation_config.txt_duration,
        });
      });
      return t;
    }

    //背景圖移動
    function bk_ing_transform(click_i) {
      banner_carousel_config.bk_img.forEach(function (item, index) {
        if (index < click_i) {
          item.style.left = "-100%";
        } else {
          item.style.left = "0%";
        }
      });
    }

    //動畫流程
    function animation_process(click_i, current_i) {
      click_i = parseInt(click_i);
      if (click_i === current_i) {
        return;
      }

      banner_carousel_config.stabilization = 1;
      banner_carousel_config.current_index = click_i;
      btn_active(click_i);

      //動畫時間軸
      let t = gsap.timeline({
        onComplete: function () {
          setTimeout(() => {
            banner_carousel_config.stabilization = 0;
          }, 100);
        },
      });

      t.add(text_transition(animation_config.txt_fade_out, current_i));
      t.add(text_transition(animation_config.txt_fade_out, click_i));
      t.add(function () {
        bk_ing_transform(click_i);
      });
      t.add(text_transition(animation_config.txt_fade_in, current_i));
      t.add(text_transition(animation_config.txt_fade_in, click_i));
    }

    //初始化
    //用於動畫序列處理
    let txt_dom = txt_map(banner_carousel_config.txt);
    //綁定按鈕索引
    banner_carousel_config.btn.forEach(function (item, index) {
      item.dataset.index = index;
      banner_carousel_config.bk_img[index].dataset.index = index;
    });

    banner_carousel_config.btn[0].parentElement.addEventListener("click", function (e) {
      if (banner_carousel_config.stabilization === 0 && e.target.matches(".banner-btn")) {
        animation_process(e.target.dataset.index, banner_carousel_config.current_index);
      }
    });
  })();
})();

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
