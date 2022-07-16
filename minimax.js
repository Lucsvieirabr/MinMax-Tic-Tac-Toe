function makeiamove() {
  let move = minimax(board);
  make_move(move[0], move[1], "O");
}
function getPossiblesMoves(gameBoard) {
  let possibleMoves = [];
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (gameBoard[i][j] == "") {
        possibleMoves.push([i, j]);
      }
    }
  }
  return possibleMoves;
}
function getScore(gameBoard){
  if(checkWinner(gameBoard)){
    if(winner == "X"){
      return -1;
    }
    return 1;
  }
  return 0;

}
function score_all_moves(gameBoard, moves, player) {
  let scoredMoves = [];
  for(let i = 0; i < moves.length; i++){
    gameBoard[moves[i][0]][moves[i][1]] = player;
    if(!hasPossibleMoves(gameBoard)){
      let score = getScore(gameBoard);
      scoredMoves.push([score]);
      gameBoard[moves[i][0]][moves[i][1]] = "";
    }else{
      let newmoves = getPossiblesMoves(gameBoard);
      score_all_moves(gameBoard, newmoves, (player == "X") ? "O" : "X");  
    } 
  }
  return scoredMoves;
}
function hasPossibleMoves(gameBoard){
  if(checkWinner(gameBoard)){
    return false;
  }
  let possibleMoves = getPossiblesMoves(gameBoard);
  if(possibleMoves.length == 0){
    return false;
  }
  return true;
}
function getBestMove(moves, scoredMoves) {
  let bestMove = moves[0];
  let bestScore = scoredMoves[0];
  for(let i = 0; i < scoredMoves.length; i++){
    if(scoredMoves[i] > bestScore){
      bestScore = scoredMoves[i];
      bestMove = moves[i];
    }
  }
  return bestMove;
}
function minimax(gameBoard){
  let possibleMoves = getPossiblesMoves(gameBoard);
  let scoredMoves = score_all_moves(gameBoard, possibleMoves, "O");
  let bestMove = getBestMove(possibleMoves, scoredMoves);
  return bestMove;
}
