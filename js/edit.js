import { buttonClickSound3 } from "./sound";

const openBtn = document.querySelector(".open-btn");
const editPopup = document.querySelector(".edit-popup");
const openBtnP = document.querySelector(".open-btn p");

openBtn.addEventListener("click", () => {
  buttonClickSound3();
  if (editPopup.classList.contains("edit-open")) {
    console.log("close");

    editPopup.classList.remove("edit-open");
    editPopup.classList.add("edit-close");
  } else {
    console.log("open");
    editPopup.classList.remove("edit-close");
    editPopup.classList.add("edit-open");
  }

  if (openBtnP.classList.contains("p-open")) {
    openBtnP.classList.remove("p-open");
    openBtnP.classList.add("p-close");
  } else {
    console.log("open");
    openBtnP.classList.remove("p-close");
    openBtnP.classList.add("p-open");
  }
});
