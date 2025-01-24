let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Audio elements
let bgMusic = document.querySelector("#bg-music");
let clickSound = new Audio("click-sound.mp3");
let winSound = new Audio("win-sound.mp3");
let musicBtn = document.querySelector("#music-btn");

// Player turn tracking
let turnO = true;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Function to reset the game
const resetGame = () => {
    turnO = true;  
    msgContainer.classList.add("hide");
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();  // Play click sound

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to show the winner message
const showWinner = (winner) => {
    msg.innerText = `Congrats 🎉, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    winSound.play();  // Play winning sound
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

// Function to play/pause background music
const toggleMusic = () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = "Pause Music";
    } else {
        bgMusic.pause();
        musicBtn.innerText = "Play Music";
    }
};

// Event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);

// Event listener for music button
musicBtn.addEventListener("click", toggleMusic);

// Automatically start background music on page load
window.addEventListener("load", () => {
    bgMusic.play();
});
