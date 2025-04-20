// 通用函數
export { rendering_ui_template_strings, cart_price__card, toolbox, revise_input_num };

function revise_input_num(input, num) {
  let input_num = parseInt(input.value) || 0;
  let result = input_num + num;

  if (result < 0) {
    result = 0;
  }
  input.value = result;
}

/**
 * 渲染模板字符串
 * @param {*} data 渲染資料
 * @param {*} html 結構
 * @param {*} target 目標css類名
 */
function rendering_ui_template_strings(data, html, target) {
  let dom = document.querySelector(target); //插入目標
  let buffer = ""; //緩存
  dom.innerHTML = "";
  data.forEach(function (item) {
    buffer += html(item);
  });

  dom.insertAdjacentHTML("beforeend", buffer);
}

function cart_price__card(item) {
  return `
    <li class="item">
        <div class="price-name">
            ${item.name}
        </div>
        <div class="price">
            共${item.order * item.price}元
        </div>
    </li>`;
}

// const r_toolbox = {
//     window_size: {
//         /**
//          * 響應式頁面-寬度判斷處理調用
//          * @param {給定判斷寬度} Width
//          * @param {大於該尺寸的callback} onExceed
//          * @param {小於等於該尺的寸callback} onBelowOrEqual
//          */
//         check_trigger: function (Width, onExceed, onBelowOrEqual) {

//             function handleResize() {
//                 let size_judgment = window.innerWidth - Width
//                 if (size_judgment > 0) {
//                     onExceed()
//                 } else {
//                     onBelowOrEqual()
//                 }
//             }

//             handleResize();// 初始檢查
//             window.addEventListener('resize', handleResize);//尺寸變化
//             //這裡應該有問題 大量使用時會不斷掛載 須注意
//         }
//     }
// }

const toolbox = {
  rwd_size_monitor: {
    previous_width: 0,
    size_listener: [],
    /**
     * 響應式頁面-寬度判斷處理
     * @param {給定判斷寬度} width
     * @param {大於該尺寸的callback} onExceed
     * @param {小於等於該尺的寸callback} onBelowOrEqual
     */
    size: function (width, onExceed, onBelowOrEqual) {
      function size_judgment() {
        if (previous_width === 0) {
          //判斷是否為第一次進入
          judgment();
        } else if (previous_width < width && window.innerWidth > width) {
          //前次小於且本次大於
          judgment();
        } else if (previous_width > width && window.innerWidth < width) {
          //前次大於且本次小於
          judgment();
        }
        //可以合併條件

        function judgment() {
          if (window.innerWidth > width) {
            onExceed();
          } else {
            onBelowOrEqual();
          }
        }

        previous_width = window.innerWidth;
      }

      if (size_listener === null) {
        size_judgment(); //初始化

        window.addEventListener("resize", size_judgment);
      }
    },

    clear: function () {
      window.removeEventListener("resize", "size_judgment");
      this.previous_width = 0;
    },
  },

  load_script: {
    //動態載入JS腳本
    script_init: function (url, callback) {
      let script = document.createElement("script");
      script.src = url;

      script.onload = function () {
        console.log(`Script ${url} loaded successfully.`);
        callback();
      };

      script.onerror = function () {
        console.error(`Failed to load script: ${url}`);
      };

      document.head.appendChild(script);
    },
  },
};
