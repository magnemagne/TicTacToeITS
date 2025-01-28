document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.button');

  const playerShow = document.getElementById("playerShow");

  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  const reset = document.getElementById("reset");
  const winScreen = document.getElementById("WinScreen");

  const row1 = document.querySelectorAll('.row1');
  const row2 = document.querySelectorAll('.row2');
  const row3 = document.querySelectorAll('.row3');
  const column1 = document.querySelectorAll('.column1');
  const column2 = document.querySelectorAll('.column2');
  const column3 = document.querySelectorAll('.column3');
  const diag = document.querySelectorAll('.diag');

  let board = [[0,0,0],[0,0,0],[0,0,0]] ;

  let currentPlayer = true;
  //currentPlayer is what determines which player is which, true is player1, while false is player2

  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("used") == "false"){
        button.setAttribute("used", "true")
        if (currentPlayer){
          button.style.backgroundColor = "red";
          button.setAttribute("playerOnSquare","true");
          player2play();
          button.children[0].setAttribute("src","x.svg")
        } else {
          button.style.backgroundColor = "blue";
          button.setAttribute("playerOnSquare","false");
          player1play();
          button.children[0].setAttribute("src","o.svg")
        }
      }
      checkVictory(button.getAttribute("playerOnSquare"));
    });
  })

  reset.addEventListener("click", resetFunction);

  player1.addEventListener("click", player1play);

  player2.addEventListener("click", player2play);

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

  function player2play(){
    currentPlayer=false;
    playerShow.innerText="Player 2";
  }

  function player1play(){
    currentPlayer=true;
    playerShow.innerText="Player 1";
  }

  function checkVictory(currentPlayer){
    let counterRow1 = 0;
    let counterRow2 = 0;
    let counterRow3 = 0;
    let counterColumn1 = 0;
    let counterColumn2 = 0;
    let counterColumn3 = 0;
    let diagCounter = 0;
    //row logic
    Array.from(row1).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        counterRow1 ++;
      }
      if (counterRow1 == 3) {
        gameWon(currentPlayer);
      }
    });
    Array.from(row2).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        counterRow2 ++;
      }
      if (counterRow2 == 3) {
        gameWon(currentPlayer);
      }
    });
    Array.from(row3).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        counterRow3 ++;
      }
      if (counterRow3 == 3) {
        gameWon(currentPlayer);
      }
    });

    //column logic
    Array.from(column1).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        counterColumn1 ++;
      }
      if (counterColumn1 == 3) {
        gameWon(currentPlayer);
      }
    });
    Array.from(column2).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        counterColumn2 ++;
      }
      if (counterColumn2 == 3) {
        gameWon(currentPlayer);
      }
    });
    Array.from(column3).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        counterColumn3 ++;
      }
      if (counterColumn3 == 3) {
        gameWon(currentPlayer);
      }
    });

    //diagonal logic
    Array.from(diag).forEach((button) => {
      if (button.getAttribute("playerOnSquare") == currentPlayer ){
        diagCounter ++;
      }
      if (diagCounter == 3) {
        gameWon(currentPlayer);
      }
    });

    //special logic
    // if (counterColumn1 == 2 && counterRow1 == 2 ){
    //   gameWon(currentPlayer);
    // }
    // if (counterColumn3 == 2 && counterRow3 == 2 ){
    //   gameWon(currentPlayer);
    // }
    // if (counterColumn3 == 2 && counterRow1 == 2){
    //   gameWon(currentPlayer);
    // }
    // if (counterColumn1 == 2 && counterRow3 == 2){
    //   gameWon(currentPlayer);
    // }

  }

  function gameWon(player){
    if (player == "false") {
      console.log("player 2 won");
      winScreen.innerText = "Player 2 won !";
      document.body.style.backgroundColor = "rgb(187, 182, 242)"; //blue
    }
    if (player == "true") {
      console.log("player 1 won");
      winScreen.innerText = "Player 1 won !";
      document.body.style.backgroundColor = "rgb(242, 182, 191)"; //red
    }
    Array.from(buttons).forEach((button) => {
      button.setAttribute("used","true");
    });
  }

});
