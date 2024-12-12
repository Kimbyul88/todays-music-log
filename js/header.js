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
