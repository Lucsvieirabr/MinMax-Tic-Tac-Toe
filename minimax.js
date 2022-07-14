function makeiamove() {
    minimax(board,0, []);
}

function minimax(IAboard,score, moves) {
  if(score === 1) {
    make_move(moves[0][0], moves[0][1], "O");
    return
  }
  if(score === -1) {
    return
  }
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (IAboard[i][j] == "") {
        IAboard[i][j] = timeOf;
        moves.push([i, j]);
        if (checkWin()) {
          if(timeOf == "X") {
             score =-1;
          }else {
            score = 1;
          }
        }else{
            score = 0;
        }
        minimax(IAboard,score, moves);
        IAboard[i][j] = "";
      }
    }
  }
}
