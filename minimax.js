function makeiamove() {
  //pegar todos os movimentos possíveis
  //pegar todos os possíveis gameboards
  //Fazer o score de cada gameboard
  //Pegar o gameboard com o maior score
  let possiblesmoves = getPossibleMoves(board);
  let possiblesGameBoards = getPossiblesGameBoards(board, "O");
  let moveScores = [];
  for (let i = 0; i < possiblesmoves.length; i++) {
    let gameboard = possiblesGameBoards[i];
    let score = getMoveScore(gameboard, "O");
    moveScores.push(score);
  }
  let maxScore = Math.max(...moveScores);
  let maxIndex = moveScores.indexOf(maxScore);
  let move = possiblesmoves[maxIndex];
  make_move(move[0], move[1], "O");
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
function hasEmptyCells(gBoard) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gBoard[i][j] == "" && !checkWinner(gBoard)) {
        return true;
      }
    }
  }
  return false;
}
function getMoveScore(IAboard, player) {
  let possibleGameBoards = getPossiblesGameBoards(IAboard, player);
  let scores = [];
  for (let i = 0; i < possibleGameBoards.length; i++) {
    let score = getBoardScore(possibleGameBoards[i], player);
    scores.push(score);
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
function getBoardScore(gBoard, player) {
  if (checkWinner(gBoard)) {
    if (winner == player) {
      return 1;
    }
    return -1;
  }
  return 0;
}
function minimax(gBoard, player) {
  let possiblesmoves = getPossibleMoves(gBoard);
  let possiblesGameBoards = getPossiblesGameBoards(gBoard, player);
}

