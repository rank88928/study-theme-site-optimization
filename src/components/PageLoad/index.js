import "./style.scss";

let body = document.querySelector("body");
let preload_container = document.querySelector(".preload-container");

let preload_html = `<div class="preload">
                        <div class="loader"></div>
                    </div>`;

body.style.overflow = "hidden";
preload_container.insertAdjacentHTML("afterbegin", preload_html);

export function load_finish() {
  setTimeout(() => {
    preload_container.style.display = "none";
    body.style.overflow = "auto";
  }, 500);
}
