/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

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

// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var

let score = 0;

// global tracking vars

let isEventListenerActive = false;

//control the snake

let d;

document.addEventListener("keydown", direction);

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
}

function handleKeyupEvent(e) {
    if (e.key === 'Escape' || (e.ctrlKey && e.altKey && e.key === 's')) {
        console.log("Escape or ctrl alt s pressed, hiding iframe in snake JS");
        e.stopPropagation();
        e.preventDefault();

        // Getting the iframe element from the parent document
        let gameFrame = window.parent.document.getElementById('gameFrame');

        // Check if the iframe is not hidden
        if (!gameFrame.hasAttribute('hidden')) {
            console.log("Hiding iframe in snake JS");
            // Hiding the iframe
            gameFrame.setAttribute('hidden', '');
            gameFrame.style.display = 'none'; // This line might be redundant if you're using 'hidden'

            // Assuming you want to remove the listener here
            document.removeEventListener("keyup", handleKeyupEvent);
            isEventListenerActive = false;
        }
    }
}

document.addEventListener("keyup", handleKeyupEvent);

function cycleEventListener() {
    if(!isEventListenerActive) {
        document.addEventListener("keyup", handleKeyupEvent);
    }
}

// If play again button is clicked, start interval again
document.getElementById("play-again-button").addEventListener("click", function () {
    playAgain();
    cycleEventListener();
});

// If spacebar is pressed, start interval again
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
        playAgain();
    }
});

// If ctrl alt s is pressed, grab parent iframe and hide it
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.altKey && event.key === 's') {
        console.log("Hiding iframe")
        // Getting the iframe element
        var gameFrame = document.getElementById('gameFrame');

        // Hiding the iframe
        gameFrame.setAttribute('hidden', 'true');
    }
});

// cheack collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
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
        // After 1 second delay, display modal with button "Play Again"
        setTimeout(function () {
            document.getElementById("play-again-modal").style.display = "flex";
        }, 500);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);


















