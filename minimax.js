function makeiamove() {
  if(board[2][0] == "X" && board[1][1] == "" || board[2][2] == "X" && board[1][1] == "") {
    make_move(1, 1, "O");
    return
  }
  let IAmove = getBestMove(board, "O");
  let gboard = JSON.parse(JSON.stringify(board));
  gboard[IAmove[0]][IAmove[1]] = "O";
  if(hasEmptyCells(gboard)){
    let XMoveScore = moveScore(gboard, "X");
    let IaMoveScore = moveScore(gboard, "O");
    if(XWinNextTurn(gboard) || IaMoveScore < XMoveScore){
      IAmove = getBestMove(board, "X");
    }
  } 
  make_move(IAmove[0], IAmove[1], "O");
}

function moveScore(gboard, player){
  let playerScore = min_move_scores(gboard, player);
  let maxScore = Math.max(...playerScore);
  return maxScore;
}

function XWinNextTurn(gBoard) {
  let XNext_move = getBestMove(gBoard, "X");
  if(!XNext_move){return false;}
  gBoard[XNext_move[0]][XNext_move[1]] = "X";
  if(checkWinner(gBoard)){
    return true;
  }
  return false;
}
function getBestMove(gboard, player){
  gboard = JSON.parse(JSON.stringify(gboard));
  let possiblesmoves = getPossibleMoves(gboard);
  let possiblesGameBoards = getPossiblesGameBoards(gboard, player);
  for (let i = 0; i < possiblesmoves.length; i++) {
    if(checkWinner(possiblesGameBoards[i])){
      if(winner == player){
        return possiblesmoves[i];
      }
    }
  }
  let moveScores = min_move_scores(gboard, player);
  let maxScore = Math.max(...moveScores);
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
    let score = minimax(gameboard, player, 1);
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

function minimax(IAboard, player, depth) {
  let possibleGameBoards;
  let scores = [];
  if(hasEmptyCells(IAboard)){
    possibleGameBoards = getPossiblesGameBoards(IAboard);
  }
  else{
    let score = getBoardScore(IAboard, player);
    return getFinalScore([score],depth);
  }
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
        return minimax(possibleGameBoards[i], player == "X" ? "O" : "X", depth + 1);
      }
    }
  }
 
  return getFinalScore(scores,depth);

}

function getFinalScore(scores, depth){
  let sum = scores.reduce(function (a, b) {
    return a + b;
  });
  return sum /  depth;
}
