import "./style.scss";
import bkimg from "@/img/store/bk.webp";
import "@/shared/gsap/loadgsap.js";
import { gsap } from "gsap";
import { text_split } from "@/shared/gsap/animation_utils.js";

let slogan_text_box = document.querySelector(".slogan .text-box");
let slogan_h2 = document.querySelector(".slogan h2");
let title_box = document.querySelector(".title-box");
let slogan_p = document.querySelectorAll(".slogan p");
document.querySelector(".slogan img").src = `${bkimg}`;

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

fade_in(slogan_text_box);
text_fade_in_sequence(slogan_h2);
scroll_up(title_box);
scroll_left(slogan_p[0]);
scroll_right(slogan_p[1]);
scroll_left(slogan_p[2]);
