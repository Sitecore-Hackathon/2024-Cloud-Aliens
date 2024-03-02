// -------------- Variables
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32;
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
let score = 0;
let isEventListenerActive = false;
let isGamePaused = false;
let gameOver = false;
let d;

// ------------------ Functions

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "red" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        gameOver = true;
        if (window.parent && typeof window.parent.updateScores === "function") {
            window.parent.updateScores(score);
        }
        // After 1 second delay, display modal with button "Play Again"
        setTimeout(function () {
            document.getElementById("play-again-modal").style.display = "flex";
        }, 500);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Times New Roman";
    ctx.fillText(score, 2 * box, 1.6 * box);

    ctx.fillStyle = "white";
    ctx.font = "20px Times New Roman";
    // grab name from attr-player-name on iframe
    const playerName = window.parent.document.getElementById('gameFrame').getAttribute('attr-player-name');
    ctx.fillText("Player: " + playerName, 2 * box + 40, 1.6 * box);
    let playerNameSize = ctx.measureText("Player: " + playerName);

    ctx.fillStyle = "white";
    ctx.font = "20px Times New Roman";
    // grab highest score on iframe
    const highestScore = window.parent.document.getElementById('gameFrame').getAttribute('attr-highest-score') || '0';
    const highestScoreName = window.parent.document.getElementById('gameFrame').getAttribute('attr-highest-score-name') || 'No one';
    ctx.fillText(`High Score (${highestScoreName}): ${highestScore}`, 2 * box + 60 + playerNameSize, 1.6 * box);
}

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}

function playAgain() {
    document.getElementById("play-again-modal").style.display = "none";
    game = setInterval(draw, 100);
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
    score = 0;
    d = "";
    gameOver = false;
}

function toggleSnakeIframeVisibility(e) {
    if (e.key === 'Escape' || (e.ctrlKey && e.altKey && e.key === 's')) {
        document.removeEventListener("keyup", toggleSnakeIframeVisibility);
        isEventListenerActive = false;
    }
}

function cycleEventListener() {
    if (!isEventListenerActive) {
        document.addEventListener("keyup", toggleSnakeIframeVisibility);
    }
}

// ------------------ Event Listener Adding
document.addEventListener("keydown", direction);

cycleEventListener();

document.getElementById("play-again-button").addEventListener("click", function () {
    playAgain();
    cycleEventListener();
});

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) { // Spacebar key
        event.preventDefault(); // Prevent the default action to avoid scrolling the page
        if (gameOver) {
            playAgain();
            cycleEventListener();
        }
    }
});

document.getElementById("close-modal").addEventListener("click", function () {
    window.parent.document.getElementById('gameFrame').style.display = 'none';
    window.parent.document.body.focus();
});


let game = setInterval(draw, 100);