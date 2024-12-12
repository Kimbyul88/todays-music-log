export function buttonClickSound() {
  var audio = new Audio("/sound/button-34.mp3");
  audio.play();
}

export function buttonClickSound2() {
  var audio = new Audio("/sound/beep-28.mp3");
  audio.play();
}

export function buttonClickSound3() {
  var audio = new Audio("/sound/click.mp3");
  audio.play();
}

export function typingSound() {
  var audio = new Audio("/sound/button-28.mp3");
  audio.play();
}

document.querySelector(".search-input").addEventListener("input", typingSound);
