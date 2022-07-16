function makeiamove() {
  //
}
function getPossibleMoves(IAboard){
  let possibleMoves = [];
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        possibleMoves.push([i, j]);
      }
    }
  }
}
function getPossiblesGameBoards(IAboard, player){
  let possiblesGameBoards = [];
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        let newBoard = JSON.parse(JSON.stringify(IAboard));
        newBoard[i][j] = player;
        possiblesGameBoards.push(newBoard);
      }
    }
  }
  return possiblesGameBoards;
}

function getBoardScore(gBoard){
  if(checkWinner(gBoard)){
    if(winner == "X"){
      return -1;
    }
    else{
      return 1;
    }
  }
}
function minimax(gBoard, player){
  let possiblesmoves = getPossibleMoves(gBoard);
  let possiblesGameBoards = getPossiblesGameBoards(gBoard, player);
}
