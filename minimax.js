function makeiamove() {
  minimax(board, 0, [], timeOf);
}

function minimax(IAboard, score, moves, player) {
  
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        IAboard[i][j] = player;
        moves.push([i, j]);
        if (checkWinner()) {
          if (player == "X") {
            score = -1;
          } else {
            score = 1;
          }
        } else {
          score = 0;
        }
        if (
          (score = 0 && board.filter((x) => x.filter((y) => y == "").length == 0).length > 0)
        ) {
          return;
        }
        minimax(IAboard, score, moves, (player == "X") ? "O" : "X");
        console.log(board);
        if(i == 3 && j == 3){return}
        IAboard[i][j] = "";
      }
    }
  } 
}
