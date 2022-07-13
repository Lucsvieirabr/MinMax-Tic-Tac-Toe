let wCell = 420 / 3;
let hCell = 420 / 3;
let timeOf = "X";
let scoreX = 0;
let scoreO = 0;
let hasWon = false;
let winnerLineCord;
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
}

function make_move(column, row, ctx){
    changeClickedCell_Ctx(column, row, ctx);
    drawBoardChanges(column, row, ctx);
    if(checkWinner()){
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

function checkWinner(){
    let winOnRow = checkRows();
    let winOnColumn =checkColumns();
    let winOnDiagonal = checkDiagonals();
    return winOnRow || winOnColumn || winOnDiagonal;
}

function checkColumns(){
    for(let i = 0; i < 3; i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ""){
            let x1 = hCell/2 + i * hCell;
            let y1 = wCell/2;
            let y2 = hCell/2 *5;
            winnerLineCord =[x1, y1, x1, y2]
            return true;
        }
    }
    return false;
}

function checkRows(){
    for(let i = 0; i < 3; i++){
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ""){
            let x1 = wCell/2;
            let y1 = hCell/2 + i * hCell;
            let x2 = 2.5 * wCell;
            winnerLineCord = [x1, y1, x2, y1]
            return true
        }
    }
    return false;
}

function checkDiagonals(){
    if(board[1][1] == board[0][0] && board[1][1] == board[2][2] && board[1][1] != ""){
        let x1 = wCell/2;
        let y1 = hCell/2;
        let x2 = wCell *2.5;
        let y2 = hCell * 2.5;
        winnerLineCord = [x1, y1, x2, y2];
        return true;
    }
    if(board[1][1] == board[0][2] && board[1][1] == board[2][0] && board[1][1] != ""){
        let x1 = wCell * 2.5;
        let y1 = hCell/2;
        let x2 = wCell/2;
        let y2 = hCell * 2.5;
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