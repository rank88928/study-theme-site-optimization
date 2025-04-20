let cat_dropmenu = document.querySelector(".cat-dropmenu");

function expand_effect(parent_e, triggering_e, dropmenu_e) {
  parent_e.addEventListener("click", function (e) {
    let target = e.target;

    if (target.classList.contains(triggering_e)) {
      let box = target.nextElementSibling;
      box.classList.toggle("h-auto-3");
    }
  });
}
expand_effect(cat_dropmenu, "main-cat", "ul");
