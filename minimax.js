function makeiamove() {

  let IAmove = getBestMove(board, "O");
  let gboard = copy_game_board(board);
  gboard[IAmove[0]][IAmove[1]] = "O";
  if(hasEmptyCells(gboard)){
    if(XWinNextTurn(gboard)){
      IAmove = getBestMove(gboard, "X");
    }
  }
  make_move(IAmove[0], IAmove[1], "O");
}

function XWinNextTurn(gBoard) {
  let XNext_move = getBestMove(gBoard, "X");
  if(!XNext_move){return false;}
  gBoard[XNext_move[0]][XNext_move[1]] = "X";
  if(checkWinner(gBoard)){
    gBoard[XNext_move[0]][XNext_move[1]] = "";
    return true;
  }
  return false;
}
function getBestMove(gboard, player){
  gboard = copy_game_board(gboard);
  let possiblesmoves = getPossibleMoves(gboard);
  let possiblesGameBoards = getPossiblesGameBoards(gboard, player);
  let moveScores = get_moves_scores(possiblesGameBoards, player);
  let bestScore = player == "O"? Math.max(...moveScores) : Math.min(...moveScores);
  let maxIndex = moveScores.indexOf(bestScore);
  return possiblesmoves[maxIndex];
}

function get_moves_scores(possiblesGameBoards, player) {
  let moveScores = [];
  for (let i = 0; i < possiblesGameBoards.length; i++) {
    let moveScore = minimax(possiblesGameBoards[i], player, 1, [getBoardScore(possiblesGameBoards[i])], player);
    moveScores.push(moveScore);
  }
  return moveScores;
}
function minimax(IAboard, player, depth, scores, alpha) {
  if(!hasEmptyCells(IAboard)){return player == "O"? Infinity : -Infinity;}
  let possiblesGameBoards = getPossiblesGameBoards(IAboard, player) || [IAboard];
  scores.push(...score_all_GameBoards(possiblesGameBoards, player));
  for (let i = 0; i < possiblesGameBoards.length; i++) {
    if (hasEmptyCells(possiblesGameBoards[i])) {
      minimax(possiblesGameBoards[i], player == "X" ? "O" : "X", depth + 1, scores, alpha);
    }
  }
  return getFinalScore(scores, depth);
}

function copy_game_board(gboard) {
  return JSON.parse(JSON.stringify(gboard));
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
        let newBoard = copy_game_board(IAboard);
        newBoard[i][j] = player;
        possiblesGameBoards.push(newBoard);
      }
    }
  }
  return possiblesGameBoards;
}

function getBoardScore(gBoard) {
  if (checkWinner(gBoard)) {
    if (winner == "O") {
      return 1;
    }
    return -3;
  }
  return 0.2;
}

function score_all_GameBoards(gBoards, player) {
  let scores = [];
  for (let i = 0; i < gBoards.length; i++) {
    let score = getBoardScore(gBoards[i], player);
    scores.push(score);
  }
  return scores;
}

function getFinalScore(scores, depth){
  let sum = scores.reduce(function (a, b) {
    return a + b;
  });
  return sum /  depth;
}
