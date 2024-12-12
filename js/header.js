const toolsInfoBtn = document.querySelector(".tools_info");
const infoPopup = document.querySelector(".info-popup");

toolsInfoBtn.addEventListener("click", () => {
  toolsInfoBtn.classList.toggle("btn-active");
  if (infoPopup.classList.contains("popup-show")) {
    infoPopup.classList.add("popup-hide");
    setTimeout(() => {
      infoPopup.classList.remove("popup-show");
    }, 500);
  } else {
    infoPopup.classList.remove("popup-hide");
    infoPopup.classList.add("popup-show");
  }
});

const toolsColorBtn = document.querySelector(".tools_color");
const colorPopup = document.querySelector(".color-popup");

toolsColorBtn.addEventListener("click", () => {
  toolsColorBtn.classList.toggle("btn-active");
  if (colorPopup.classList.contains("popup-show")) {
    colorPopup.classList.add("popup-hide");
    setTimeout(() => {
      colorPopup.classList.remove("popup-show");
    }, 500);
    console.log(colorPopup);
    console.log("hide");
  } else {
    colorPopup.classList.remove("popup-hide");
    colorPopup.classList.add("popup-show");
    console.log(colorPopup);

    console.log("show");
  }
});

const colorBtns = document.querySelectorAll(".color-btn");

colorBtns.forEach((colorBtn) => {
  colorBtn.addEventListener("click", () => {
    const color = colorBtn.getAttribute("data-color");
    document.documentElement.style.setProperty("--pink", color);
  });
});
