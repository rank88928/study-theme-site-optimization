import year_block_bk from "@/img/store/store-02.webp";
import concept_block_bk from "@/img/store/bk.webp";
import content_img_1 from "@/img/aboutus/banner-bk-3.webp";
import content_img_2 from "@/img/store/store-03.webp";
import content_img_3 from "@/img/aboutus/chef.webp";
import content_img_4 from "@/img/aboutus/team.webp";
import content_img_5 from "@/img/aboutus/banner-bk-2.webp";
import concept_1 from "@/img/aboutus/concept-01.webp";
import concept_2 from "@/img/aboutus/concept-02.webp";
import concept_3 from "@/img/aboutus/concept-03.webp";
import concept_4 from "@/img/aboutus/concept-04.webp";

let content_img_arr = [content_img_1, content_img_2, content_img_3, content_img_4, content_img_5];
let concept_img_arr = [concept_1, concept_2, concept_3, concept_4];

document.querySelector(".year-block").style.backgroundImage = `url("${year_block_bk}")`;

document.querySelector(".concept-block").style.backgroundImage = `url("${concept_block_bk}")`;

document.querySelectorAll(".year-img").forEach((item, index) => {
  item.src = `${content_img_arr[index]}`;
});

document.querySelectorAll(".concept-img").forEach((item, index) => {
  item.src = `${concept_img_arr[index]}`;
});
