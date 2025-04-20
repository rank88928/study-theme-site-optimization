import { load_gsap } from "../utils/gsap/loadgsap.js";
import { text_split } from "../utils/gsap/animation_utils.js";

let slogan_text_box = document.querySelector(".slogan .text-box");
let slogan_h2 = document.querySelector(".slogan h2");
let title_box = document.querySelector(".title-box");
let slogan_p = document.querySelectorAll(".slogan p");
let information_card = document.querySelectorAll(".info-box");
let information_item_dom = information_item_format(information_card);
let serve_box = document.querySelector(".serve-container");

function slogan_scroll_config(target) {
  return {
    trigger: target,
    start: "bottom 50%",
    end: "bottom 30%",
    scrub: true,
  };
}

function fade_in(target) {
  gsap.to(target, {
    opacity: 0.8,
    duration: 5,
  });
}
function text_fade_in_sequence(target) {
  text_split(target);

  gsap.fromTo(
    target.children,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power2.out",
      duration: 1,
    }
  );
}
function scroll_up(target) {
  gsap.fromTo(
    target,
    {
      opacity: 1,
      y: 0,
    },
    {
      opacity: 0,
      y: -50,
      duration: 2,
      scrollTrigger: slogan_scroll_config(target),
    }
  );
}
function scroll_left(target) {
  gsap.fromTo(
    target,
    {
      opacity: 1,
      x: 0,
    },
    {
      opacity: 0,
      x: -50,
      duration: 2,
      scrollTrigger: slogan_scroll_config(target),
    }
  );
}
function scroll_right(target) {
  gsap.fromTo(
    target,
    {
      opacity: 1,
      x: 0,
    },
    {
      opacity: 0,
      x: 50,
      duration: 2,
      scrollTrigger: slogan_scroll_config(target),
    }
  );
}

function information_item_format(data) {
  let arr = Array.from(data).map((item) => {
    let item_arr = [];
    let dt = item.querySelectorAll("dt");
    let dd = item.querySelectorAll("dd");

    item_arr.push(item.querySelector("h3"));
    item_arr.push(item.querySelector("p"));

    // for (let i = 0; i < dt.length; i++) {
    //   item_arr.push(dt[i]);
    //   item_arr.push(dd[i]);
    // }
    item_arr.push(item.querySelectorAll("dt"));
    item_arr.push(item.querySelectorAll("dd"));
    item_arr.push(item.querySelector("button"));
    return item_arr;
  });

  return arr;
}

function information_timeline_anim() {
  information_item_dom.forEach((item) => {
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: item[0],
        start: "bottom 50%",
        end: "bottom 30%",
        scrub: false,
      },
    });

    item.forEach((child_item) => {
      let t = gsap.fromTo(
        child_item,
        {
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)", //裁切遮罩
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.5,
        }
      );
      timeline.add(t);
    });
  });
}

function fade_in_from_bottom(target) {
  let item_arr = target.querySelectorAll(".item");
  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: target.querySelector("h2"),
      start: "top 80%",
      end: "bottom 30%",
      scrub: false,
      // markers: true,
    },
  });

  Array.from(item_arr).forEach((item) => {
    let t = gsap.fromTo(
      item,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    );
    timeline.add(t);
  });
}

(async () => {
  await load_gsap();
  //標題區域
  fade_in(slogan_text_box);
  text_fade_in_sequence(slogan_h2);
  scroll_up(title_box);
  scroll_left(slogan_p[0]);
  scroll_right(slogan_p[1]);
  scroll_left(slogan_p[2]);
  //門市資訊
  information_timeline_anim();
  //服務
  fade_in_from_bottom(serve_box);
})();
