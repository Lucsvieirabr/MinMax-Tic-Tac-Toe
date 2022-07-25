function makeiamove() {
  let IAmove = getBestMove(board, "O");
  let IaMoveScore = moveScore(board, "O");
  let gboard = JSON.parse(JSON.stringify(board));
  if(board[2][0] == "X" || board[0][0] == "X" || board[2][2] == "X" || board[0][2] == "X") {
    if(movesCount == 1 && board[1][1] == "") {
      make_move(1, 1, "O");
      return
    }
    if(board[2][0] == "X" && gboard[1][0] == "") {
      gboard[1][0] = "O";
      if(getBoardScore(gboard, "O") == 1) {
        make_move(1, 0, "O");
        return
      }
      let nScore = moveScore(gboard, "O");
      gboard[1][0] = "";
      if(nScore > IaMoveScore) {
        make_move(1, 0, "O");
        return
      }
    }
    if(board[0][0] == "X" && gboard[0][1] == "") {
      gboard[0][1] = "O";
      if(getBoardScore(gboard, "O") == 1) {
        make_move(0, 1, "O");
        return
      }
      let nScore = moveScore(gboard, "O");
      gboard[0][1] = "";
      if(nScore > IaMoveScore) {
        make_move(0, 1, "O");
        return
      }
    }
    if(board[2][2] == "X" &&  gboard[2][1] == "") {
      gboard[2][1] = "O";
      if(getBoardScore(gboard, "O") == 1) {
        make_move(2, 1, "O");
        return
      }
      let nScore = moveScore(gboard, "O");
      gboard[2][1] = "";
      if(nScore > IaMoveScore) {
        make_move(2, 1, "O");
        return
      }
    }

    if(board[0][2] == "X" && gboard[1][2] == "") {
      gboard[1][2] = "O";
      if(getBoardScore(gboard, "O") == 1) {
        make_move(1, 2, "O");
        return
      }
      let nScore = moveScore(gboard, "O");
      gboard[1][2] = "";
      if(nScore > IaMoveScore) {
        make_move(1, 2, "O");
        return
      }
    }
    
  }
  gboard[IAmove[0]][IAmove[1]] = "O";
  if(hasEmptyCells(gboard)){
    let XMoveScore = moveScore(board, "X");
    if(XWinNextTurn(gboard) || IaMoveScore < XMoveScore){
      console.log("I am making a move");
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
  if(!hasEmptyCells(IAboard)){return false;}
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

function minimax(IAboard, player, depth, scores) {
  scores = scores || [];
  if(!hasEmptyCells(IAboard)){
    scores.push(getBoardScore(IAboard, player));
    return getFinalScore(scores, depth);}
  let possibleGameBoards = getPossiblesGameBoards(IAboard);
  possibleGameBoards = possibleGameBoards? possibleGameBoards : [IAboard];
  for (let i = 0; i < possibleGameBoards.length; i++) {
    let score = getBoardScore(possibleGameBoards[i], player);
    scores.push(score);
  }
  for (let i = 0; i < possibleGameBoards.length; i++) {
    if (hasEmptyCells(possibleGameBoards[i])) {
      return minimax(possibleGameBoards[i], player == "X" ? "O" : "X", depth + 1, scores);
    }
  }
  return getFinalScore(scores,depth, player);

}

function getFinalScore(scores, depth, player){
  let sum = scores.reduce(function (a, b) {
    return a + b;
  });
  return player =="X"? sum /depth * -1 : sum /  depth;
}
