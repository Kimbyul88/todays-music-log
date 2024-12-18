import { buttonClickSound, buttonClickSound3 } from "./sound";

const toolsInfoBtn = document.querySelector(".tools_info");
const infoPopup = document.querySelector(".info-popup");

toolsInfoBtn.addEventListener("click", () => {
  buttonClickSound3();
  if (toolsInfoBtn.classList.contains("btn-active")) {
    toolsInfoBtn.classList.add("btn-inactive");
    setTimeout(() => {
      toolsInfoBtn.classList.remove("btn-active");
      toolsInfoBtn.classList.remove("btn-inactive");
    }, 500);
  } else {
    toolsInfoBtn.classList.remove("btn-inactive");
    toolsInfoBtn.classList.add("btn-active");
  }
  //
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

//
const toolsColorBtn = document.querySelector(".tools_color");
const colorPopup = document.querySelector(".color-popup");

toolsColorBtn.addEventListener("click", () => {
  buttonClickSound3();
  if (toolsColorBtn.classList.contains("btn-active")) {
    toolsColorBtn.classList.add("btn-inactive");
    setTimeout(() => {
      toolsColorBtn.classList.remove("btn-active");
      toolsColorBtn.classList.remove("btn-inactive");
    }, 500);
  } else {
    toolsColorBtn.classList.remove("btn-inactive");
    toolsColorBtn.classList.add("btn-active");
  }
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
    buttonClickSound();
    if (
      colorBtn.classList.contains("yellow") ||
      colorBtn.classList.contains("green") ||
      colorBtn.classList.contains("skyblue") ||
      colorBtn.classList.contains("pink3")
    ) {
      document.documentElement.style.setProperty("--theme-white", "black");
      document.documentElement.style.setProperty("--bg-color", "#BEBDC4");
    } else {
      document.documentElement.style.setProperty("--theme-white", "white");
      document.documentElement.style.setProperty("--bg-color", "#d6d5dc");
    }
    const color = colorBtn.getAttribute("data-color");
    document.documentElement.style.setProperty("--pink", color);
  });
});
