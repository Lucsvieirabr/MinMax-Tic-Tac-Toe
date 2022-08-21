let wCell = 420 / 3;
let hCell = 420 / 3;
let timeOf = "X";
let scoreX = 0;
let scoreO = 0;
let hasWon = false;
let winner = "";
let winnerLineCord;
let IAMode = true;
let isPaused = false;
function getMouseCord(event){
    let mouseX = event.clientX - canvas.offsetLeft;
    let mouseY = event.clientY - canvas.offsetTop;
    return {x: mouseX, y: mouseY};
}
function changeIAState(){
    IAMode = !IAMode;
    document.getElementById("IaBt").style.backgroundColor = IAMode? "rgb(42, 227, 79)" : "red";
}
function getClickedCell(mouseX, mouseY){

    let column = Math.floor(mouseX / wCell);
    let row = Math.floor(mouseY / hCell);
    return {ctx: board[column][row], column, row};
}

function playerClicked(event){
    if(hasWon || isPaused){return;}
    let mouseCord = getMouseCord(event);
    let Clickedcell = getClickedCell(mouseCord.x, mouseCord.y);
    if(Clickedcell.ctx != ""){return;}
    make_move(Clickedcell.column, Clickedcell.row, timeOf);
    if(!hasWon && hasEmptyCells(board) && IAMode){makeiamove();}
}

function make_move(column, row, ctx){
    changeClickedCell_Ctx(column, row, ctx);
    drawBoardChanges(column, row, ctx);
    if(checkWinner(board)){
        hasWon = true;
        changeScore(timeOf);
        drawnLine(winnerLineCord[0], winnerLineCord[1], winnerLineCord[2], winnerLineCord[3], 'red', 4);
        timeOf = "X";
        return;
    }
    timeOf = (timeOf == "X") ? "O" : "X";
}


function changeClickedCell_Ctx(column, row, ctx){
    board[column][row] = ctx;
}

function checkWinner(gBoard){
    let winOnRow = checkRows(gBoard);
    let winOnColumn =checkColumns(gBoard);
    let winOnDiagonal = checkDiagonals(gBoard);
    return winOnRow || winOnColumn || winOnDiagonal;
}

function checkColumns(gBoard){
    for(let i = 0; i < 3; i++){
        if(gBoard[i][0] == gBoard[i][1] && gBoard[i][1] == gBoard[i][2] && gBoard[i][0] != ""){
            let x1 = hCell/2 + i * hCell;
            let y1 = wCell/2;
            let y2 = hCell/2 *5;
            winnerLineCord =[x1, y1, x1, y2]
            winner = gBoard[i][0];
            return true;
        }
    }
    return false;
}

function checkRows(gBoard){
    for(let i = 0; i < 3; i++){
        if(gBoard[0][i] == gBoard[1][i] && gBoard[1][i] == gBoard[2][i] && gBoard[0][i] != ""){
            let x1 = wCell/2;
            let y1 = hCell/2 + i * hCell;
            let x2 = 2.5 * wCell;
            winnerLineCord = [x1, y1, x2, y1]
            winner = gBoard[0][i];
            return true
        }
    }
    return false;
}

function checkDiagonals(gBoard){
    if(gBoard[1][1] == gBoard[0][0] && gBoard[1][1] == gBoard[2][2] && gBoard[1][1] != ""){
        let x1 = wCell/2;
        let y1 = hCell/2;
        let x2 = wCell *2.5;
        let y2 = hCell * 2.5;
        winnerLineCord = [x1, y1, x2, y2];
        winner = gBoard[1][1];
        return true;
    }
    if(gBoard[1][1] == gBoard[0][2] && gBoard[1][1] == gBoard[2][0] && gBoard[1][1] != ""){
        let x1 = wCell * 2.5;
        let y1 = hCell/2;
        let x2 = wCell/2;
        let y2 = hCell * 2.5;
        winnerLineCord = [x1, y1, x2, y2];
        winner = gBoard[1][1];
        return true;
    }
    return false;
}
function changeScore(player, reset){
    if(player == "X"){
        scoreX = reset? 0 : scoreX + 1;
        document.getElementById("scoreX").innerHTML = scoreX;
    }else{
        scoreO = reset? 0 : scoreO + 1;
        document.getElementById("scoreO").innerHTML = scoreO;
    }
}

function hasEmptyCells(gBoard) {
    if(checkWinner(gBoard)){return false;}
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gBoard[i][j] == "") {
          return true;
        }
      }
    }
    return false;
  }
  