import "./style.scss";

let accordion = document.querySelector(".l-accordion");

if (accordion) {
  accordion.addEventListener("click", function (e) {
    if (e.target.closest("li")) {
      let li = e.target.closest("li");
      let answer = li.querySelector(".answer");
      let arrow = li.querySelector(".fa-solid");

      answer.classList.toggle("h-auto-3");
      arrow.classList.toggle("down-rotate");
    }
  });
}
