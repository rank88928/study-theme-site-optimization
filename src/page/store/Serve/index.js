import "./style.scss";
import "@/shared/gsap/loadgsap.js";
import { gsap } from "gsap";

import img_1 from "@/img/store/item-01.webp";
import img_2 from "@/img/store/item-02.webp";
import img_3 from "@/img/store/item-03.webp";
import img_4 from "@/img/store/item-04.webp";

let img_arr = [img_1, img_2, img_3, img_4];

document.querySelectorAll(".serve-container img").forEach((item, index) => {
  item.src = img_arr[index];
});

let serve_box = document.querySelector(".serve-container");

function fade_in_from_bottom(target) {
  let item_arr = target.querySelectorAll(".item");
  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: target.querySelector("h2"),
      start: "top 80%",
      end: "bottom 30%",
      scrub: false,
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

fade_in_from_bottom(serve_box);
