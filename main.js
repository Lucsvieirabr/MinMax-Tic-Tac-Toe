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
  if(state){
    document.getElementById("menu").style.display = "block";
    document.getElementById("menuBt").style.display = "none";
    document.getElementById("closeBt").style.display = "block";
    document.getElementById("gameCanvas").style.filter = "blur(5px)";
    return
  }
  document.getElementById("menu").style.display = "none";
  document.getElementById("menuBt").style.display = "block";
  document.getElementById("closeBt").style.display = "none";
  document.getElementById("gameCanvas").style.filter = "blur(0px)";
}
