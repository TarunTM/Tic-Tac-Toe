const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initailise game
initGame();

function initGame(){
    currentPlayer="X";
    gameGrid= ["","","","","","","","",""];
    boxes.forEach((box ,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    
    gameInfo.innerText = `Player ${currentPlayer} Turn `;
    // newGameBtn.classList.remove("active");
}

function handleClick(index) {
     if (gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
     }
}

boxes.forEach((box , index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    })
});

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Player ${currentPlayer} Turn`;
}

function checkGameOver() {
    // let ans = "";

    winningPositions.forEach((position) => {

        if(gameGrid[position[0]] != "" && gameGrid[position[1]] != "" && gameGrid[position[2]] != "" 
            && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] )
            {
                if(gameGrid[position[0]] == "X")
                    {
                        ans = "X";
                    }
                else
                    {
                        ans ="O";
                    }

                    boxes.forEach((box) => {
                        box.style.pointerEvents ="none";
                    });
                
                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");

                    gameInfo.innerText = `${ans} Wins !!`;
                    newGameBtn.classList.add("active");
            }

        // if(ans !== "")
        //     {
        //         gameInfo.innerText = `${ans} Wins`;
        //         newGameBtn.classList.add("active");
        //     }

        let boxCount = 0;
        gameGrid.forEach((box) =>{
            if(box !== ""){
                boxCount++;
            }
        });
        

        if(boxCount === 9 && ans === ""){
            gameInfo.innerText = "Game Tied!!"
            newGameBtn.classList.add("active");
        }

    });
    
}

newGameBtn.addEventListener("click" , initGame);