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

