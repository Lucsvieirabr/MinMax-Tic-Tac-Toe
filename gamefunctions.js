let wCell = 420 / 3;
let hCell = 420 / 3;
let timeOf = "X";
let scoreX = 0;
let scoreO = 0;
let hasWon = false;
let winnerLineCord;
let winner;
function getMouseCord(event){
    let mouseX = event.clientX - canvas.offsetLeft;
    let mouseY = event.clientY - canvas.offsetTop;
    return {x: mouseX, y: mouseY};
}

function getClickedCell(mouseX, mouseY){

    let column = Math.floor(mouseX / wCell);
    let row = Math.floor(mouseY / hCell);
    return {ctx: board[column][row], column, row};
}

function playerClicked(event){
    if(hasWon){return;}
    let mouseCord = getMouseCord(event);
    let Clickedcell = getClickedCell(mouseCord.x, mouseCord.y);
    if(Clickedcell.ctx == ""){
        make_move(Clickedcell.column, Clickedcell.row, timeOf);
    }  
   if(!hasWon){makeiamove();}
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

function checkWinner(gameBoard){
    let winOnRow = checkRows(gameBoard);
    let winOnColumn =checkColumns(gameBoard);
    let winOnDiagonal = checkDiagonals(gameBoard);
    return winOnRow || winOnColumn || winOnDiagonal;
}

function checkColumns(gameBoard){
    for(let i = 0; i < 3; i++){
        if(gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2] && gameBoard[i][0] != ""){
            let x1 = hCell/2 + i * hCell;
            let y1 = wCell/2;
            let y2 = hCell/2 *5;
            winnerLineCord =[x1, y1, x1, y2]
            winner = gameBoard[i][0];
            return true;
        }
    }
    return false;
}

function checkRows(gameBoard){
    for(let i = 0; i < 3; i++){
        if(gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i] && gameBoard[0][i] != ""){
            let x1 = wCell/2;
            let y1 = hCell/2 + i * hCell;
            let x2 = 2.5 * wCell;
            winnerLineCord = [x1, y1, x2, y1]
            winner = gameBoard[0][i];
            return true
        }
    }
    return false;
}

function checkDiagonals(gameBoard){
    if(gameBoard[1][1] == gameBoard[0][0] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[1][1] != ""){
        let x1 = wCell/2;
        let y1 = hCell/2;
        let x2 = wCell *2.5;
        let y2 = hCell * 2.5;
        winnerLineCord = [x1, y1, x2, y2];
        winner = gameBoard[1][1];
        return true;
    }
    if(gameBoard[1][1] == gameBoard[0][2] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[1][1] != ""){
        let x1 = wCell * 2.5;
        let y1 = hCell/2;
        let x2 = wCell/2;
        let y2 = hCell * 2.5;
        winner = gameBoard[1][1];
        winnerLineCord = [x1, y1, x2, y2];
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