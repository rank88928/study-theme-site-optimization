import "./style.scss";

let html = ` <div class="anchor">
                 <div class="but">
                     <a href="#header" title="回到最上方"><i class="fa-solid fa-sort-up"></i></a>
                </div>
            </div>`;

document.body.insertAdjacentHTML("beforeend", html);

$(".anchor").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$(document).ready(function () {
  let $target = $(".anchor");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $target.fadeIn();
    } else {
      $target.fadeOut();
    }
  });
});
