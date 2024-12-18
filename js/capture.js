import html2canvas from "html2canvas";
import { cameraSound } from "./sound";

let captureContent = document.querySelector("html");
let captureBtn = document.querySelector(".capture-btn");
const searchWrapper = document.querySelector(".search-wrapper");
const rightTools = document.querySelector(".right-tools");

function handleCaptureClick() {
  searchWrapper.style.display = "none";
  captureBtn.style.display = "none";
  rightTools.style.display = "none";
  html2canvas(captureContent, {
    useCORS: true, // 외부 이미지를 캡처 가능하게 설정
    allowTaint: true, // 외부 이미지를 캡처 가능하게 설정
  }).then((canvas) => {
    saveImg(canvas.toDataURL("image/jpg"), "capture.jpg");
  });
  cameraSound();
  searchWrapper.style.display = "flex";
  captureBtn.style.display = "flex";
  rightTools.style.display = "flex";
}

const saveImg = (uri, filename) => {
  let link = document.createElement("a");

  document.body.appendChild(link);

  link.href = uri;
  link.download = filename;
  link.click();

  document.body.removeChild(link);
};

captureBtn.addEventListener("click", handleCaptureClick);
