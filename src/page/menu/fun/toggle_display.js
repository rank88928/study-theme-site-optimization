import { card_config } from "@/store/product.js";

let mode_box = document.querySelector(".display-mode-box");

function revise_class(old_class, new_class, describe_show) {
  let card = document.querySelectorAll(".card");
  let show = describe_show ? "-webkit-box" : "none";

  card.forEach((item) => {
    item.classList.replace(old_class, new_class);
    item.querySelector("p").style.display = show;
  });
}

function mode_btn() {
  mode_box.addEventListener("click", function (e) {
    let target = e.target.closest(".detailed, .simple");
    if (!target) return;

    let class_name = target.className;
    if (class_name === "detailed") {
      revise_class("card-simple", "card-detailed", true);
      card_config.mode = "detailed";
    } else if (class_name === "simple") {
      revise_class("card-detailed", "card-simple", false);
      card_config.mode = "simple";
    }
  });
}
mode_btn();
