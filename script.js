document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.button');

  const playerShow = document.getElementById("playerShow");

  const player1button = document.getElementById("player1");
  const player2button = document.getElementById("player2");
  const reset = document.getElementById("reset");
  const winScreen = document.getElementById("WinScreen");

  let board = [[0,0,0],[0,0,0],[0,0,0]] ;

  function Player(color, backgroundcolor, identification, sign){
    this.color = color;
    this.backgroundcolor = backgroundcolor;
    this.identification = identification;
    this.sign = sign;
  }

  var player1 = new Player("blue", "rgb(154, 173, 255)", "player1", "o.svg");
  var player2 = new Player("red", "rgb(255, 173, 148) ", "player2", "x.svg");
  // var player3 = new Player("green", "rgb(255, 173, 148) ", "player2", "x.svg");
  var players = [player1, player2];

  let count = 0;
  // let currentPlayer = true;
  //currentPlayer is what determines which player is which, true is player1, while false is player2

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

        console.log(board);
   
        checkVictory(currentPlayer); 
        nextPlayer();   
      }
      // var coord1 = String(button.id).charAt(0);
      // var coord2 = String(button.id).charAt(1);
      // alert(coord1 + coord2);
    });
  })

  function nextPlayer() {
    currentPlayer = players[players.length - (players.indexOf(currentPlayer)) - 1];
  }

  reset.addEventListener("click", resetFunction);

  player1button.addEventListener("click", nextPlayer());

  player2button.addEventListener("click", nextPlayer());

  function resetFunction(){
    Array.from(buttons).forEach((button) => {
      button.setAttribute("used","false");
      button.setAttribute("playerOnSquare","none");
      button.style.backgroundColor="rgb(213, 202, 202)";
      button.children[0].setAttribute("src","blank.svg")
    })
    document.body.style.backgroundColor = "#ebe3e3";
    winScreen.innerText = "";
  }

  function playerPlay(player){
    playerShow.innerText=player.identification;
  }

  function checkVictory(player){
    //check each row vertically and horizontally
    for (let x = 0; x < 3; x++){
      let countRow = 0;
      for (let y = 0; y < 3; y++){
        if(board[x][y] == player.identification){
          countRow ++;
        }
        if (countRow > 2){
          gameWon(player)
        }
      }
    }
    for (let y = 0; y < 3; y++){
      let countRow = 0;
      for (let x = 0; x < 3; x++){
        if(board[x][y] == player.identification){
          countRow ++;
        }
        console.log(board[x][y])
        if (countRow > 2){
          gameWon(player)
        }
      }
    }
    //check diagonally
    if(board[1][1] == player.identification && board[0][0] == player.identification && board[2][2] == player.identification){
      gameWon(player);
    }
    if(board[1][1] == player.identification && board[0][2] == player.identification && board[2][0] == player.identification){
      gameWon(player);
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

  function gameWon(player){
    console.log(player.identification + " won");
    winScreen.innerText = player.identification + " won!";
    document.body.style.backgroundColor = player.backgroundcolor;    
    Array.from(buttons).forEach((button) => {
      button.setAttribute("used","true");
    });
  }

});
