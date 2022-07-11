let canvas;
let canvasContext;
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let wCell;
let hCell;
let Cells_in_Rows_Board;

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;
  drawnBoardGame();
  setupBasicValues();
  canvas.addEventListener('click', function(e){playerClicked(e)});

};

function playerClicked(event){
    //get real mouse pox
    let mouseX = event.clientX - canvas.offsetLeft;
    let mouseY = event.clientY - canvas.offsetTop;
    console.log(mouseX, mouseY);
    
}

function setupBasicValues(){
    wCell = canvas.width / 3;
    hCell = canvas.height / 3;
    Cells_in_Rows_Board = [
        [
          { x: 0, y: 0, posOnBoard: board[0][0] },
          { x: wCell, y: 0, posOnBoard: board[0][1] },
          { x: wCell * 2, y: 0, posOnBoard: board[0][2] },
        ],
        [
          { x: 0, y: hCell, posOnBoard: board[1][0] },
          { x: wCell, y: hCell, posOnBoard: board[1][1] },
          { x: wCell * 2, y: hCell, posOnBoard: board[1][2] },
        ],
        [
          { x: 0, y: hCell * 2, posOnBoard: board[2][0] },
          { x: wCell, y: hCell * 2, posOnBoard: board[2][1] },
          { x: wCell * 2, y: hCell * 2, posOnBoard: board[2][2] },
        ],
      ];
}
