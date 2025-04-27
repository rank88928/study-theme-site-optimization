import "./style.scss";
import "@/shared/gsap/loadgsap.js";
import { gsap } from "gsap";

import img_1 from "@/img/store/store-01.webp";
import img_2 from "@/img/store/store-02.webp";
import img_3 from "@/img/store/store-03.webp";
import img_4 from "@/img/store/store-04.webp";

let store_img_arr = [img_1, img_2, img_3, img_4];

document.querySelectorAll(".store-img").forEach((item, index) => {
  item.src = store_img_arr[index];
});

let information_card = document.querySelectorAll(".info-box");
let information_item_dom = information_item_format(information_card);

function information_item_format(data) {
  let arr = Array.from(data).map((item) => {
    let item_arr = [];

    item_arr.push(item.querySelector("h3"));
    item_arr.push(item.querySelector("p"));

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

information_timeline_anim();
