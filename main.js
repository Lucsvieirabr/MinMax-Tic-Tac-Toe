let canvas;
let canvasContext;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    drawnBoardGame();
}
