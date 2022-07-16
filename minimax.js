function makeiamove() {
  randomPlayer(board, 0, [], timeOf);
}
function randomPlayer(IAboard, score, moves, player){
  let possibleMoves = [];
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        console.log('pode jogar em ', i, j);
        possibleMoves.push([i, j]);
      }
    }
  }
  let randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  make_move(randomMove[0], randomMove[1], player)
}

function minimax(IAboard, score, moves, player) {
  //Fazer uma array com todos os movimentos possíveis e depois percorrer todos os movimentos com o Minimax
  //Se não tiver nenhum movimento possível, então vai no que tem melhor score
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        console.log('pode jogar em ', i, j);
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
      }
    }
  } 
}
