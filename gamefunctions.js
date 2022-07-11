let wCell = 420 / 3;
let hCell = 420 / 3;
let timeOf = "X";

function getMouseCord(event){
    let mouseX = event.clientX - canvas.offsetLeft;
    let mouseY = event.clientY - canvas.offsetTop;
    return {x: mouseX, y: mouseY};
}

function getClickedCell(mouseX, mouseY){

    let column = Math.floor(mouseX / wCell);
    let row = Math.floor(mouseY / hCell);
    return {ctx: board[column][row], column: column, row:row};
}

function playerClicked(event){

    let mouseCord = getMouseCord(event);
    let Clickedcell = getClickedCell(mouseCord.x, mouseCord.y);
    if(Clickedcell.ctx == ""){
        board[Clickedcell.column][Clickedcell.row] = timeOf;
        drawBoardChanges(Clickedcell.column, Clickedcell.row, timeOf);
        if(checkWinner()){
            alert(timeOf + " is the winner!");
        }
        timeOf = (timeOf == "X") ? "O" : "X";
    }
    
}

function checkWinner(){
    let winOnRow = checkRows();
    let winOnCollum =checkColumns();
    let winOnDiagonal = checkDiagonals();
    if(winOnRow || winOnCollum || winOnDiagonal){
        return true;
    }
}

function checkRows(){
    for(let i = 0; i < 3; i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ""){
            return true;
        }
    }
    return false;
}

function checkColumns(){
    for(let i = 0; i < 3; i++){
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ""){
            return true
        }
    }
    return false;
}

function checkDiagonals(){
    if(board[1][1] == board[0][0] && board[1][1] == board[2][2] && board[1][1] != "" || board[1][1] == board[0][2] && board[1][1] == board[2][0] && board[1][1] != ""){
        return true;
    }
    return false;
}