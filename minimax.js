function makeiamove() {
  let centerMoveBoard = JSON.parse(JSON.stringify(board));
  let centerScore = "";
  if(movesCount ==1 && board[1][2] == "X"){
    make_move(0, 2, "O");
    return;
  }
  if(centerMoveBoard[1][1] == ""){
    centerMoveBoard[1][1] = "O";
    centerScore = getMoveScore(centerMoveBoard, "O");
  }
  let IAmove = getBestMove(board, "O");
  let gboard = JSON.parse(JSON.stringify(board));
  gboard[IAmove[0]][IAmove[1]] = "O";
  let IAscore = getBoardScore(gboard, "O");
  centerScore = centerScore < 0 ? centerScore*-1 : centerScore;
  if(centerScore >=IAscore && gboard[1][1] == ""){
    make_move(1, 1, "O");
    return;
  }
  if(hasEmptyCells(gboard)){
    let XNext_move = getBestMove(gboard, "X");
    gboard[XNext_move[0]][XNext_move[1]] = "X";
    let Xscore = getMoveScore(gboard, "X");
    if(checkWinner(gboard) && winner == "X" || IAscore < Xscore*-1){
      IAmove = XNext_move;
    }
  
  } 
  let newBoard = JSON.parse(JSON.stringify(board));
  newBoard[IAmove[0]][IAmove[1]] = "O";
  let newMovement = getBestMove(newBoard, "X");
  newBoard[newMovement[0]][newMovement[1]] = "X";
  let newScore = getBoardScore(newBoard, "X");
  let newMovement2 = getBestMove(newBoard, "X");
  if(newScore > IAscore){
    make_move(newMovement[0], newMovement[1], "O");
    return;
  }
  make_move(IAmove[0], IAmove[1], "O");
}
function getBestMove(gboard, player){
  gboard = JSON.parse(JSON.stringify(gboard));
  let possiblesmoves = getPossibleMoves(gboard);
  let moveScores = min_move_scores(gboard, player);
  let maxScore = player == "X" ? Math.min(...moveScores) : Math.max(...moveScores);
  let maxIndex = moveScores.indexOf(maxScore);
  return possiblesmoves[maxIndex];
}
function min_move_scores(gboard, player) {
  gboard = JSON.parse(JSON.stringify(gboard));
  let possiblesmoves = getPossibleMoves(gboard);
  let possiblesGameBoards = getPossiblesGameBoards(gboard, player);
  let moveScores = [];
  for (let i = 0; i < possiblesmoves.length; i++) {
    let gameboard = possiblesGameBoards[i];
    let score = getMoveScore(gameboard, player);
    moveScores.push(score);
  }
  return moveScores;
}
function getPossibleMoves(IAboard) {
  let possibleMoves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        possibleMoves.push([i, j]);
      }
    }
  }
  return possibleMoves;
}
function getPossiblesGameBoards(IAboard, player) {
  let possiblesGameBoards = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        let newBoard = JSON.parse(JSON.stringify(IAboard));
        newBoard[i][j] = player;
        possiblesGameBoards.push(newBoard);
      }
    }
  }
  return possiblesGameBoards;
}

function getBoardScore(gBoard, player) {
  if (checkWinner(gBoard)) {
    if (winner == player) {
      return 1;
    }
    return -1;
  }
  return 0;
}

function getMoveScore(IAboard, player) {
  let possibleGameBoards;
  if(hasEmptyCells(IAboard)){
    possibleGameBoards = getPossiblesGameBoards(IAboard);
  }
  else{
    possibleGameBoards = [IAboard];
  }
  let scores = [];
  if(possibleGameBoards.length == 0){
    scores.push(getBoardScore(IAboard, player));
  }else{
    for (let i = 0; i < possibleGameBoards.length; i++) {
      let score = getBoardScore(possibleGameBoards[i], player);
      scores.push(score);
    }
  }
  if (
    scores.filter(function (score) {
      return score != 0;
    }).length == 0
  ) {
    for (let i = 0; i < possibleGameBoards.length; i++) {
      if (hasEmptyCells(possibleGameBoards[i])) {
        return getMoveScore(possibleGameBoards[i], player == "X" ? "O" : "X");
      }
    }
  }
 
  let sum = scores.reduce(function (a, b) {
    return a + b;
  });
  return player == "X" ? -1*sum : sum;

}

 
