let wCell = 420 / 3;
let hCell = 420 / 3;
let timeOf = "X";
let scoreX = 0;
let scoreO = 0;

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
        changeScore(timeOf);
        return true;
    }
}

function checkColumns(){
    for(let i = 0; i < 3; i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ""){
            let x1 = hCell/2 + i * hCell;
            let y1 = wCell/2;
            let y2 = hCell/2 *5;
            drawnLine(x1, y1, x1, y2, 'red');
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
            drawnLine(x1, y1, x2, y1, 'red');
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
        drawnLine(x1, y1, x2, y2, 'red');
        return true;
    }
    if(board[1][1] == board[0][2] && board[1][1] == board[2][0] && board[1][1] != ""){
        let x1 = wCell * 2.5;
        let y1 = hCell/2;
        let x2 = wCell/2;
        let y2 = hCell * 2.5;
        drawnLine(x1, y1, x2, y2, 'red');
        return true;
    }
    return false;
}
function changeScore(winner){
    if(winner == "X"){
        scoreX++;
        document.getElementById("scoreX").innerHTML = scoreX;
    }else{
        scoreO++;
        document.getElementById("scoreO").innerHTML = scoreO;
    }
}