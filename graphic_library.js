function drawnLine(x1, y1, x2, y2, color, width){
    let old = canvasContext.strokeStyle;
    canvasContext.lineWidth = width || 1;
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.strokeStyle = color;
    canvasContext.stroke();
    canvasContext.strokeStyle = old;
}

function drawRect(x, y, width, height, color){
    let old = canvasContext.fillStyle;
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
    canvasContext.fillStyle = old;
}

function write_text(x, y, text, color, fontSize, font){
    let old = canvasContext.fillStyle;
    canvasContext.font = fontSize + " " + font;
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
    canvasContext.fillStyle = old;
}

function drawn_Setup_BoardGame(){
    
    // Lines of Tic Tac Toe
    // And Clear canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawnLine(canvas.width/3, 0, canvas.width/3, canvas.height, 'black');
    drawnLine(canvas.width/3*2, 0, canvas.width/3*2, canvas.height, 'black');
    drawnLine(0, canvas.height/3, canvas.width, canvas.height/3, 'black');
    drawnLine(0, canvas.width/3*2, canvas.width, canvas.height/3*2, 'black');

}
function drawBoardChanges(column, row, timeOf){
    let x = column * canvas.width/3;
    let y = row * canvas.height/3;
    write_text(x + canvas.width/8, y + canvas.height/5, timeOf, 'black', '50px', 'Arial');
}

function clearGameBoard(){
    hasWon = false;
    drawn_Setup_BoardGame();
    winner = "";
    movesCount = 0;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    timeOf = "X";
}

function clearScore(){
    changeScore("X", true);
    changeScore("O", true);
}

