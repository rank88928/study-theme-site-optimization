import "@/scss/base/_reset.scss";
import "@/scss/base/_globals.scss";
import "@/scss/base/_base.scss";
import "@/scss/base/_button.scss";
import "@/scss/base/_animation_utilities.scss";
//
import "@/scss/layout/_nav.scss";
import "@/scss/layout/_header.scss";
import "@/scss/layout/_footer.scss";
import "@/scss/module/_quantity_selector_box.scss";
//
import "@fortawesome/fontawesome-free/css/all.min.css";
//
import logo from "@/img/layout/logo.png";
import qr from "@/img/layout/qr-code.png";
let logo_img = document.querySelector("#logo-img");
logo_img.src = logo;

let qr_code = document.querySelector(".qr-code img");
qr_code.src = qr;
