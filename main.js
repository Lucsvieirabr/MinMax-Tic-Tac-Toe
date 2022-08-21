let canvas;
let canvasContext;
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvas.width = 420;
  canvas.height = 420;
  drawn_Setup_BoardGame();
  canvas.addEventListener('click', function(e){playerClicked(e)});

};
function change_menu_state(state){
  isPaused = state;
  document.getElementById("menu").style.display = state? "block" : "none";
  document.getElementById("menuBt").style.display = state? "none" : "block";
  document.getElementById("closeBt").style.display = state? "block" : "none";
  document.getElementById("gameCanvas").style.filter = state? "blur(5px)" : "none";
}
