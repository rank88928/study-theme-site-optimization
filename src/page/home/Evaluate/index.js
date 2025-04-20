import "./style.scss";
import img_bk from "@/img/bk-6.jpg";

let evaluate_data = [
  {
    name: "Tingting",
    img_url: "1",
    evaluate: "Delicious food, excellent service!",
    star: "4",
  },
  {
    name: "Weihao",
    img_url: "2",
    evaluate: "Comfortable environment, rich variety of dishes!",
    star: "5",
  },
  {
    name: "Daming",
    img_url: "3",
    evaluate: "Amazing gastronomic feast!",
    star: "4",
  },
  {
    name: "Boxiang",
    img_url: "4",
    evaluate: "Friendly service, reasonable prices.",
    star: "5",
  },
  {
    name: "Zhang",
    img_url: "5",
    evaluate: "Excellent taste, will come again next time.",
    star: "5",
  },
  {
    name: "JC",
    img_url: "6",
    evaluate: "Unique dishes, impressive.",
    star: "4",
  },
];

let feedback_list = document.querySelector(".feedback-list");
let feedback_content = document.querySelector(".feedback-content");
feedback_content.style.backgroundImage = `url("${img_bk}")`;

function stars_number(star) {
  let html = "";
  for (let i = 0; star > i; i++) {
    html += '<i class="fa-solid fa-star"></i>';
  }
  return html;
}

// 輪播
(async function () {
  let feedback_list_buffer_html = await feedback_produce();
  feedback_list.insertAdjacentHTML("beforeend", feedback_list_buffer_html);

  $(document).ready(function () {
    $(".feedback-list").slick({
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 3,
      arrows: false,
      autoplay: true,
    });
  });
})();

// 回饋卡片
async function feedback_produce() {
  let html = "";
  evaluate_data.forEach(function (item) {
    html += feedback_html(item);
  });

  return html;
}
//人物照片是外部傳來
function feedback_html(data) {
  let item = ` <div class="m_feedback_card">
            <div class="details">
                <div class="user-img">
                    <img src="https://picsum.photos/seed/${data.img_url}/400/400" alt="">
                </div>
                <div class="info">
                    <p class="user-name">${data.name}</p>
                    <p class="user-feedback">${data.evaluate}</p>
                </div>
            </div>
            <div class="star">
                ${stars_number(data.star)}
            </div>
        </div>`;

  return item;
}
