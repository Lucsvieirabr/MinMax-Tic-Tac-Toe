function makeiamove() {
  let IAmove = getBestMove(board, "O");
  let IaMoveScore = moveScore(board, "O");
  let gboard = JSON.parse(JSON.stringify(board));
  
  if(hasEmptyCells(gboard)){
    let XMoveScore = moveScore(board, "X");
    if(XWinNextTurn(gboard) && IaMoveScore < XMoveScore){
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
  scores = scores || [getBoardScore(IAboard, player)]; 
  
  let possiblesGameBoards = getPossiblesGameBoards(IAboard) || [IAboard];
  scores.push(...score_all_GameBoards(possiblesGameBoards, player));
  for (let i = 0; i < possiblesGameBoards.length; i++) {
    if (hasEmptyCells(possiblesGameBoards[i])) {
      return minimax(possiblesGameBoards[i], player == "X" ? "O" : "X", depth + 1, scores);
    }
  }
  return getFinalScore(scores, depth);
}

function score_all_GameBoards(gBoards, player) {
  let scores = [];
  for (let i = 0; i < gBoards.length; i++) {
    let score = getBoardScore(gBoards[i], player);
    scores.push(score);
  }
  return scores;
}

function getFinalScore(scores, depth, player){
  let sum = scores.reduce(function (a, b) {
    return a + b;
  });
  return player =="X"? sum /depth * -1 : sum /  depth;
}
