function makeiamove() {
  
  let IAmove_and_board = next_player_move_and_board(board, "O");
  if(hasEmptyCells(IAmove_and_board[1])){
    let XNext_move_and_board = next_player_move_and_board(IAmove_and_board[1], "X");
    if(!hasEmptyCells(XNext_move_and_board[1]) && checkWinner(XNext_move_and_board[1])){
      IAmove_and_board = XNext_move_and_board;
    }
    if(hasEmptyCells(XNext_move_and_board[1])){
      let IAmove_and_board2 = next_player_move_and_board(XNext_move_and_board[1], "O");
      if(!checkWinner(IAmove_and_board2[1])){
        IAmove_and_board = IAmove_and_board2;
      }
  }

  
  }
    make_move(IAmove_and_board[0][0], IAmove_and_board[0][1], "O");
  }
function next_player_move_and_board(gboard, player){
  let player_move = getBestMove(gboard, player);
  
  let player_newMove_board = JSON.parse(JSON.stringify(gboard));
  player_newMove_board[player_move[0]][player_move[1]] = player;
  return [player_move, player_newMove_board];
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
  let possibleGameBoards = getPossiblesGameBoards(IAboard, player=="X"?"O":"X");
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

 
