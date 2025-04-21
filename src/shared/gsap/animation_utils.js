function text_split(target) {
  let text = target.textContent.trim();
  target.innerHTML = "";

  text.split("").forEach((item) => {
    let span = document.createElement("span");
    span.textContent = item;
    span.style.display = "inline-block";
    target.appendChild(span);
  });
}

export { text_split };
