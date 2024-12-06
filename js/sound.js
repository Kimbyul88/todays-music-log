export function buttonClickSound() {
  console.log("buttonClickSound");

  var audio = new Audio("../public/sound/button-34.mp3");
  audio.play();
}

document
  .querySelector(".search-result__div")
  .addEventListener("click", buttonClickSound);
