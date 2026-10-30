/*
Game Name : Tic Tic Toe Game 
Developer Name : Rajendra Singh 
Last Update : 30/10/2026 
Build With Love : Today's Raj Coding 
EMAIL : devlprsrajpurohit1008@gmail.com
FREE OPEN SOURCE CODE FOR EVERYONE 
*/

let game_Container = document.getElementsByClassName("game-container")[0];
let Sms_container = document.getElementsByClassName("Sms-container")[0];
let Restart_btn = document.getElementsByClassName("btn")[0];
let HeadingText = document.getElementsByClassName("Heading")[0];
let scores = document.getElementsByClassName("scores")[0];
let GameWinnerVideo = document.getElementById("GameWinner-Video");
let ResultAnimationBox = document.querySelector(".ResultAnimationBox");
let infoDescription = document.querySelector(".infoDescription");''

const bgMusic = new Audio("assets/bgmusic.mp3");
const dice1Music = new Audio("assets/dice1.mp3");
const dice2Music = new Audio("assets/dice2.mp3");
const gameOverMusic = new Audio("assets/gamedrow.mp3");
const gameWinMusic = new Audio("assets/gamewinner.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.1;




 

// Player Arrays to store each Player dice history
let gameActive = true;
let isMusicPlaying = false;
let player_1 = []; // 5 time can roll dice
let player_2 = []; // 4 time can roll dice


//Before Winning Condition Approach 
// let verticalWinning_Condition = [147, 174, 741, 417, 471, 258, 285, 852, 528, 282, 369, 396, 963, 639, 693]
// let horizontalWinning_Condition = [123, 132, 321, 213, 231, 456, 465, 654, 546, 564, 789, 798, 987, 879, 897];
// let dignolWinning_Condition = [159, 951, 519, 591, 195, 357, 375, 753, 537, 573];
// let WinningNumbers = [].concat(verticalWinning_Condition, horizontalWinning_Condition, dignolWinning_Condition);

//Optimized Winning Conditons 
let WinningNumbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7], [1, 5, 9]];


//Restart Game Button Event
Restart_btn.addEventListener("click", () => {
    game_Restart();
    Restart_btn.style.display = "none";
      dice1Music.currentTime = 0;
            dice1Music.play().catch(e => console.log("click sound is blocked : " , e));
});


// Toggle Infomation Container 
infoDescription.addEventListener("click", () => {
    infoDescription.style.display = "none";
    game_Container.style.display = "none";
    document.querySelector(".info").style.display = "flex";
    let closeBtn = document.querySelector(".closebtn");
    closeBtn.style.display = "flex";
    closeBtn.addEventListener("click", () => {
        document.querySelector(".info").style.display = "none";
        game_Container.style.display = "grid";

        setTimeout(() => {
            closeBtn.style.display = "none";
            infoDescription.style.display = "flex";
        }, 100);
    })


})



// PlayWithRobort Function Start()
function playWithRobort() {
    console.log("playWithRobort:  Robot is Player 1");
    game_Restart();
    game_Container.className = "game-container Mode-Robort Player-1"

    // Trigger the Robot's first move instantly
    setTimeout(() => {
        robortTurn();
    }, 500);
}


// Play 1 vs 1 Function Start()
function play_1vs1() {
    console.log("play_1vs1");
    game_Restart();
    game_Container.className = "game-container Player-1";
    // Game_Start();
}



// Game Start Function For Checking Each Winning Condtion and Players Toggle 
function Game_Start() {

    // // Check Winning Status
    //if player1 or player2 both one win condition check if dice > 3 time played
    if (player_1.length >= 3 || player_2.length >= 3) {

        if (isWin(player_1)) {
            console.log("isWin (1) = ", isWin(player_1));
            // alert("player 1 Win The Match congratulations!");
            PauseGameButtons();
            // Sms_container.style.display = "flex";
            HeadingText.children[0].innerHTML = `Game Winner : Player 1`;
            Restart_btn.style.display = "block";
            GameWinnerVideo.style.display = "block";
            gameWinMusic.currentTime = 0;
            gameWinMusic.volume = 0.3;
        gameWinMusic.play().catch(e => console.log("Game Start Music is blocked " , e));
            return;
        }

        if (isWin(player_2)) {
            console.log("isWin (2) = ", isWin(player_2));
            // alert("player 2 Win The Match congratulations!");
            GameWinnerVideo.style.display = "block";
            PauseGameButtons();

            // Sms_container.style.display = "flex";
            HeadingText.children[0].innerHTML = `Game Winner : Player 2`;
            Restart_btn.style.display = "block";
             gameWinMusic.currentTime = 0;
            gameWinMusic.volume = 0.3;
        gameWinMusic.play().catch(e => console.log("Game Start Music is blocked " , e));
            return;
        }
    }

    // Check Draw Status
    if ((player_1.length == 5 && player_2.length == 4) || (player_1.length == 4 && player_2.length == 5)) {
        // alert("Game End Restart");
        HeadingText.children[0].innerHTML = `No One Win the game Try Again!`;
        Restart_btn.style.display = "block";
        game_Container.style.display = "none";
        ResultAnimationBox.style.display = "flex";
        ResultAnimationBox.classList.add("GameResultAnimation");
        gameOverMusic.currentTime = 0;
        gameOverMusic.play().catch(e => console.log("Game Over Music is blocked " , e));
        gameOverMusic.volume = 0.5;
        return;
    }



    // Dynamic Turn Alternator Lifecycle
    if (game_Container.classList.contains("Player-1")) {
        game_Container.classList.remove("Player-1");
        game_Container.classList.add("Player-2");
        // Stops execution here if in Robot Mode, waiting for human user (Player 2) input
    } else {
        game_Container.classList.remove("Player-2");
        game_Container.classList.add("Player-1");

        // If Robot mode is active, hand execution control directly to the automated engine
        if (game_Container.classList.contains("Mode-Robort")) {
            setTimeout(() => {
                robortTurn();
            }, 500);
        }
    }

};



// Robort Trun Function Start()
function robortTurn() {
    let availableMoves = [];

    // Find all grid elements that haven't been disabled yet
    for (let btn of game_Container.children) {
        if (!btn.disabled) {
            availableMoves.push(btn);
        }
    }

    if (availableMoves.length === 0) return;

    // Pick a clean, unoccupied square using dynamic list filtering
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let chosenBtn = availableMoves[randomIndex];
    let diceNum = parseInt(chosenBtn.childNodes[0].nodeValue.trim());

    // Robot plays as Player 1 -> Gets Circles
    chosenBtn.innerHTML += ` <div class="circle"></div>`;
    player_1.push(diceNum);
    scores.children[0].innerHTML = `Player 1 : ${player_1.length}`;
    chosenBtn.disabled = true;

     //play the click music  for Player - 1
            dice1Music.currentTime = 0;
            dice1Music.play().catch(e => console.log("click sound is blocked : " , e));

    // Transition lifecycle execution state over to Player 2
    Game_Start();
}



// Btns Controls function
function btns_Controls() {
    for (let btns of game_Container.children) {


        btns.addEventListener("click", () => {

            //when btn click so game will be started; 
            //player 1 symbol = o circle 

            if(!isMusicPlaying){
                bgMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                })
                .catch(error => {
                    console.log("autoplay is buffered or blocked by brower : " , error);
                })
            }


           


            // Read square text node data explicitly as integers
            let diceNum = parseInt(btns.childNodes[0].nodeValue.trim());


            if (game_Container.classList.contains("Player-1") && !game_Container.classList.contains("Mode-Robort")) {
                btns.innerHTML += `   <div class="circle"></div>`;
                player_1.push(diceNum);
                console.log("Player 1 data = ", player_1);

                // update score  
                scores.children[0].innerHTML = `Player 1 : ${player_1.length}`;

                //if one time user press any circle dice so for next time disable the btn 
                btns.disabled = true;
                Game_Start();

            //play the click music  for Player - 1
            dice1Music.currentTime = 0;
            dice1Music.play().catch(e => console.log("click sound is blocked : " , e));

            } else if (game_Container.classList.contains("Player-2")) {
                //if player-2 play then.  player -2 symbol = x cross
                btns.innerHTML += `
             <div class="cross">
                    <div class="line1"></div>
                    <div class="line2"></div>
             </div> `;

                player_2.push(diceNum);
                console.log("Player 2 data = ", player_2);

                // update score  
                scores.children[1].innerHTML = `Player 2 : ${player_2.length}`;

                //play the click music  for Player - 2
            dice2Music.currentTime = 0;
            dice2Music.play().catch(e => console.log("click sound is blocked : " , e));

                //if one time user press any circle dice so for next time disable the btn 
                btns.disabled = true;
                Game_Start();

            }

        });
    }


};



//Game Restart Function
function game_Restart() {
    player_1 = [];
    player_2 = [];

    let count = 1;
    for (let btns of game_Container.children) {
        //btns enable to play again
        btns.disabled = false;
        btns.innerText = `${count}`;
        count++;
    }
    //score set default = 0
    scores.children[0].innerHTML = `Player 1 : ${player_1.length}`;
    scores.children[1].innerHTML = `Player 2 : ${player_2.length}`;
    HeadingText.children[0].innerHTML = `<i class="fa-solid fa-dice"></i>  Tic Tic Toe Game`;

    GameWinnerVideo.style.display = "none";
    game_Container.style.display = "grid";
    ResultAnimationBox.style.display = "none";

    // Reinitialize back to the default presentation layout state configurations
    game_Container.className = "game-container Player-1";
}


function PauseGameButtons() {
    for (let btns of game_Container.children) {
        btns.disabled = true;
    }
};


function isWin(playerArray) {
    // Loop through each subset row configuration
    for (let combo of WinningNumbers) {
        // Verify if the active selection footprint records all three index criteria locations
        if (playerArray.includes(combo[0]) && playerArray.includes(combo[1]) && playerArray.includes(combo[2])) {

            // Apply targeted animation presentation layers across matching markup elements
            for (let btn of game_Container.children) {
                let cellVal = parseInt(btn.childNodes[0].nodeValue.trim());
                if (combo.includes(cellVal)) {
                    if (btn.children[0]) {
                        btn.children[0].classList.add("animate");
                    }
                }
            }
            return true;
        }
    }
    return false;
}





//function random number genrator plal with robort 
function RandomNumberGenerator_1to9() {
    return Math.floor(Math.random() * 9) + 1;
}


btns_Controls();
/*

------------------ The End -----------------------
------------© 2026 Today's Raj Coding. All rights reserved. for fun --------------------------


*/