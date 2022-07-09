let canvas;
let canvasContext;
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    drawnScenery();
}
