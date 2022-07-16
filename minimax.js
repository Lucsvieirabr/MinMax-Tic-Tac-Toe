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
    let score = getScore(gameBoard);
    scoredMoves.push([score]);
    gameBoard[moves[i][0]][moves[i][1]] = "";
  }
  return scoredMoves;
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
//function minimax(IAboard, score, moves, player) {
  //Fazer uma array com todos os movimentos possíveis e depois percorrer todos os movimentos com o Minimax
  //Se não tiver nenhum movimento possível, então vai no que tem melhor score
  //for (i = 0; i < 3; i++) {
    //for (j = 0; j < 3; j++) {
      //if (IAboard[i][j] == "") {
        //console.log('pode jogar em ', i, j);
        // IAboard[i][j] = player;
        // moves.push([i, j]);
        // if (checkWinner()) {
        //   if (player == "X") {
        //     score = -1;
        //   } else {
        //     score = 1;
        //   }
        // } else {
        //   score = 0;
        // }
        // if (
        //   (score = 0 && board.filter((x) => x.filter((y) => y == "").length == 0).length > 0)
        // ) {
        //   return;
        // }
        // minimax(IAboard, score, moves, (player == "X") ? "O" : "X");
        // console.log(board);
        // IAboard[i][j] = "";
      //}
    //}
  //} 
//}
