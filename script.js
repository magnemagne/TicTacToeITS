document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.button');

  const playerShow = document.getElementById("playerShow");

  const reset = document.getElementById("reset");
  const rewind = document.getElementById("rewind");
  const message = document.getElementById("message");

  let board = [[0,0,0],[0,0,0],[0,0,0]] ;
  let history = [[0, player],[0, player],[0, player],[0, player],[0, player],[0, player],[0, player],[0, player],[0, player]];

  function Player(color, backgroundcolor, identification, sign){
    this.color = color;
    this.backgroundcolor = backgroundcolor;
    this.identification = identification;
    this.sign = sign;
  }
  var player = new Player("1","1","1","1");
  var player1 = new Player("blue", "rgb(154, 173, 255)", "player1", "o.svg");
  var player2 = new Player("red", "rgb(255, 173, 148) ", "player2", "x.svg");
  var player3 = new Player("green", "rgb(255, 173, 148) ", "player2", "x.svg");
  var players = [player1, player2];

  let turn = 0;
  var gameEnded = false;
  
  var currentPlayer = players[Math.floor(Math.random() * players.length)];

  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("used") == "false"){
        button.setAttribute("used", "true");
        button.style.backgroundColor = currentPlayer.color;
        button.setAttribute("playerOnSquare",currentPlayer.identification);
        playerPlay(currentPlayer);
        button.children[0].setAttribute("src", currentPlayer.sign)

        var coord1 = String(button.id).charAt(0);
        var coord2 = String(button.id).charAt(1);
        board[coord1][coord2] = currentPlayer.identification;

        history[turn] = [button.id, currentPlayer];
        turn ++;

        checkVictory(currentPlayer); 
        nextPlayer();   
      }
    });
  })

  function nextPlayer() {
    currentPlayer = players[players.length - (players.indexOf(currentPlayer)) - 1];
  }

  reset.addEventListener("click", resetFunction);

  rewind.addEventListener("click", () => {
    
    if (turn > 0) {    
      buttons.forEach(button => {
      button.style.backgroundColor="rgb(213, 202, 202)";
      button.children[0].setAttribute("src","blank.svg")
      button.setAttribute("used","true");
    });

      i = 0;
      function executeTurnAndWait(){
        message.innerText = "Replaying game";
        executeTurn(history.at(i)[0], history.at(i)[1], i)
        i++;
        if(i < turn){
          setTimeout(executeTurnAndWait, 2000);
        }
      }
      executeTurnAndWait();
    }
    setTimeout(() => {
      message.innerText = "Rewind ended";
    }, 2000*(turn))
  })

  function executeTurn(coord, playerRewind, turn){
    buttons.forEach(button => {
      if (button.id == coord){
        button.style.backgroundColor = playerRewind.color;
        button.children[0].setAttribute("src", playerRewind.sign)
        let actualTurn = turn + 1;
        message.innerText += " - Turn " + actualTurn + " from " + playerRewind.identification;
      }
    });
  }

  function resetFunction(){
    Array.from(buttons).forEach((button) => {
      button.setAttribute("used","false");
      button.setAttribute("playerOnSquare","none");
      button.style.backgroundColor="rgb(213, 202, 202)";
      button.children[0].setAttribute("src","blank.svg")
      turn = 0;
    })
    gameEnded = false;
    board = [[0,0,0],[0,0,0],[0,0,0]] ;
    document.body.style.backgroundColor = "#ebe3e3";
    message.innerText = "";
  }

  function playerPlay(player){
    playerShow.innerText=player.identification;
  }

  function checkVictory(player){
    if(turn == 9){
      gameEnded = true;
      gameTied();
    }
    
    //check each row vertically and horizontally
    for (let x = 0; x < 3; x++){
      let countRow = 0;
      for (let y = 0; y < 3; y++){
        if(board[x][y] == player.identification){
          countRow ++;
        }
        if (countRow > 2){
          gameWon(player, true)
        }
      }
    }
    for (let y = 0; y < 3; y++){
      let countRow = 0;
      for (let x = 0; x < 3; x++){
        if(board[x][y] == player.identification){
          countRow ++;
        }
        if (countRow > 2){
          gameWon(player, true)
        }
      }
    }
    //check diagonally
    if(board[1][1] == player.identification && (
      (board[0][0] == player.identification && board[2][2] == player.identification) || 
       (board[0][2] == player.identification && board[2][0] == player.identification))){
      gameWon(player, true);
    }
    //check around corners for impossible conditions where the other player cant win
    if(board[0][0] == player.identification && board[1][0] == player.identification && board[0][1] == player.identification 
      && board[0][2] == 0 && board[2][0] == 0
    ){
      gameWon(player);
    }
    if(board[0][2] == player.identification && board[0][1] == player.identification && board[1][2] == player.identification
      && board[0][0] == 0 && board[2][2] == 0
    ){
      gameWon(player);
    }
    if(board[2][0] == player.identification && board[1][0] == player.identification && board[2][1] == player.identification
      && board[0][0] == 0 && board[2][2] == 0
    ){
      gameWon(player);
    }
    if(board[2][2] == player.identification && board[2][1] == player.identification && board[1][2] == player.identification
      && board[0][2] == 0 && board[2][0] == 0
    ){
      gameWon(player);
    }

    //check the middle section too
    if(board[1][1] == player.identification && board[0][1] == player.identification && board[1][0] == player.identification
      && board[2][1] == 0 && board[1][2] == 0
    ){
      gameWon(player);
    }

    if(board[1][1] == player.identification && board[0][1] == player.identification && board[1][2] == player.identification
      && board[2][1] == 0 && board[1][0] == 0
    ){
      gameWon(player);
    }

    if(board[1][1] == player.identification && board[2][1] == player.identification && board[1][2] == player.identification
      && board[0][1] == 0 && board[1][0] == 0
    ){
      gameWon(player);
    }

    if(board[1][1] == player.identification && board[2][1] == player.identification && board[1][0] == player.identification
      && board[0][1] == 0 && board[1][2] == 0
    ){
      gameWon(player);
    }
  }

  function gameWon(player, wonNormally){
    gameEnded = true;
    console.log(player.identification + " won");
    if (wonNormally)
    {
      message.innerText = player.identification + " won!";
    }
    else 
    {
      message.innerText = player.identification + " will win no matter what the other player does!";
    }
    document.body.style.backgroundColor = player.backgroundcolor;    
    Array.from(buttons).forEach((button) => {
      button.setAttribute("used","true");
    });
  }

  function gameTied(){
    console.log("tie!")
    message.innerText = "Game ended in a tie!";
    // document.body.style.backgroundColor =
  }

});
