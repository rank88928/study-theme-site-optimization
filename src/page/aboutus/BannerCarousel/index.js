import "./style.scss";

import "@/shared/gsap/loadgsap.js";
import { gsap } from "gsap";

import bk1 from "@/img/aboutus/banner-bk-1.webp";
import bk2 from "@/img/aboutus/banner-bk-2.webp";
import bk3 from "@/img/aboutus/banner-bk-3.webp";

document.querySelector(".banner-1").style.backgroundImage = `url("${bk1}")`;
document.querySelector(".banner-2").style.backgroundImage = `url("${bk2}")`;
document.querySelector(".banner-3").style.backgroundImage = `url("${bk3}")`;

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
