const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const playerTurn = document.querySelector(".player-turn");
const restartBtn = document.querySelector(".restart");
const hideBtn = document.querySelector(".hide-button");
const hideBtn2 = document.querySelector(".hide-button2")
const allBtn = document.querySelectorAll(".divbtn");
const playerTurnText = document.querySelector(".player-turn-text");
const firstPlayer = document.querySelector("#first-player");
const secondPlayer = document.querySelector("#second-player");
const gameResult = document.querySelector(".game-result");



function hideDivs(event) {
    const firstDiv = document.querySelector(".container");
    firstDiv.style.display = (firstDiv.style.display === "none") ? "grid" : "none";

    const secondDiv = document.querySelector(".form-fill");
    secondDiv.style.display = (secondDiv.style.display === "none") ? "grid" : "none";
    event.preventDefault();
}

hideBtn2.addEventListener("click", hideDivs);
hideBtn.addEventListener("click", hideDivs);

const playerName = [];

function playerNameUpdate() {
    
    const firstPlayerName = (firstPlayer.value.trim() === "") ? "Player 1": firstPlayer.value;

  
    const secondPlayerName = (secondPlayer.value.trim() === "") ? "Player 2": secondPlayer.value;

    playerName.push(firstPlayerName);
    playerName.push(secondPlayerName);

    
    playerTurnText.textContent = playerName[0] + " Turn";
}

hideBtn2.addEventListener("click", playerNameUpdate);

playerCharacter = ["O", "X"];

let currentPlayerIndex = 0;
let clickCount=0;
function handleClick(event) {
    const button = event.target;
    if (!button.textContent) {
       
        currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
        playerTurnText.textContent = playerName[currentPlayerIndex] + " Turn";

        const character = document.createElement("p");
        button.appendChild(character);
        character.textContent = playerCharacter[currentPlayerIndex];

        
        clickCount++;
         if (!gameWinner && clickCount >= 9) {
            playerTurnText.textContent = "Match is Tie";
        }
    }
}

    
    
    
    allBtn.forEach(button => {
        button.addEventListener("click", (event) => handleClick(event));
    });



function resetGame() {
    currentPlayerIndex = 0;
    clickCount = 0;
    playerName.length = 0;
    const firstPlayer = document.querySelector("#first-player");
    firstPlayer.value = ""
    const secondPlayer = document.querySelector("#second-player");
    secondPlayer.value = "";
    playerTurnText.textContent = playerName[0] + " Turn";
    gameResult.textContent = "";
   
    playerTurnText.textContent = playerName[0] + " Turn";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = "";
        }
    }

    currentPlayer = "X";
    allBtn.forEach(button => {
        button.textContent = "";
        button.addEventListener("click", handleClick,gameLogic,updateGameBoard,handleBoard);

    })
}

hideBtn.addEventListener("click", resetGame);

function restart() {
    currentPlayerIndex = 0;
    clickCount = 0;
    gameResult.textContent = "";
  
    playerTurnText.textContent = playerName[0] + " Turn";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = "";
        }
    }
   
    allBtn.forEach(button => {
        button.textContent = "";
        button.addEventListener("click", handleClick);
        button.addEventListener("click", gameLogic);
        button.addEventListener("click", handleBoard,updateGameBoard);
    })
    
}

restartBtn.addEventListener("click", restart);



const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let currentPlayer = "X";
function handleBoard(row, column) {
    if(gameBoard[row][column] == ""){

        updateGameBoard(row, column, currentPlayer);

        currentPlayer = currentPlayer ==="X" ? "O" : "X";

    }
}

function updateGameBoard(row, column, value) {
    gameBoard[row][column] = value;
} 

allBtn.forEach(function (cell) {
    const cellId = cell.id;
    const splitId = cellId.split("-");
    const row = parseInt(splitId[1], 10);
    const column = parseInt(splitId[2], 10);

    cell.addEventListener("click", function () {
       handleBoard(row, column);
    });
    
})

function gameLogic() {
    for(i=0;i<3;i++){
    if(
        (gameBoard[i][0] !== "" && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) || 
        (gameBoard[0][i] !== "" && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i])

       
    )
    {
         return gameBoard[i][0];
    }

     else if( (gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2])  || 
    (gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0])
    )
    {
        return gameBoard[1][1];
    }
    }
};


allBtn.forEach(button  => {
    button.addEventListener("click", () => {
        const gameWinner = gameLogic();
console.log(gameWinner);
if (gameWinner) {
   if (gameWinner === "X") {
       gameResult.textContent = playerName[0] + " Wins!";
   } else if (gameWinner === "O") {
       gameResult.textContent = playerName[1] + " Wins!";
   }
  
}
    })
})


