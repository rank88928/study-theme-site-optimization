import "./style.scss";

let div = document.createElement("div");
div.classList.add("m-status-box");
document.body.appendChild(div);

let box = document.querySelector(".m-status-box");

function create(point, text) {
  let item = document.createElement("div");
  item.classList.add("m-status");
  item.innerHTML = `<div>${point}</div>
                    <p>${text}</p>`;
  box.appendChild(item);

  setTimeout(() => {
    if (item) {
      item.remove();
    }
  }, 3000);
}

let message = {
  success: function (text) {
    let point = `<i class="fa-solid fa-circle-check"></i>操作成功`;
    create(point, text);
  },
  error: function (text) {
    let point = `<i class="fa-solid fa-circle-xmark"></i>操作失敗`;
    create(point, text);
  },
};

export { message };
