const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const blockSize = 20;

const playerScore = document.getElementById("player-score");
const bestScore = document.getElementById("best-score");

let apple = {};
let gameLoopInterval;

const snake = {
    body: [],
    length: 0,
    direction: { x: 0, y: 0},
    speed: 0,
    gameOver: false,

    draw: function() {
        ctx.fillStyle = '#A7C957';
        this.body.forEach((block, index) => {
            if (index === 0) {
                ctx.fillStyle = '#6A994E';
            }
            ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
            ctx.fillStyle = '#A7C957';
        });
    },
    
    update: function() {
        const newHead = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };

        this.body.unshift(newHead);
    
        if (newHead.x === apple.x && newHead.y === apple.y) {
            this.length++;
            playerScore.innerText = this.length;
            generateNewApple();
        } else {
            this.body.pop();
        }
    },

    changeDirection: function(event) {
        if (event.key === "ArrowUp" && playerSnake.direction.y !== 1) {
            playerSnake.direction = { x: 0, y: -1};
        } else if (event.key === "ArrowDown" && playerSnake.direction.y !== -1) {
            playerSnake.direction = { x: 0, y: 1};
        } else if (event.key === "ArrowLeft" && playerSnake.direction.x !== 1) {
            playerSnake.direction = { x: -1, y: 0};
        } else if (event.key === "ArrowRight" && playerSnake.direction.x !== -1) {
            playerSnake.direction = { x: 1, y: 0};
        }
    },

    checkCollision: function() {
        if (
            this.body[0].x < 0 ||
            this.body[0].x >= canvas.width / blockSize ||
            this.body[0].y < 0 ||
            this.body[0].y >= canvas.height / blockSize
        ) {
            gameOver();
        }
    
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
                gameOver();
            }
        }
    }
};

const playerSnake = Object.create(snake);


function initGame() {
    playerSnake.body = [{
        x: Math.floor(Math.random() * (canvas.width / blockSize)),
        y: Math.floor(Math.random() * (canvas.height / blockSize))
    }];
    playerSnake.length = 1;
    playerSnake.direction = { x: 0, y: 0 };
    playerSnake.speed = 150;
    playerSnake.gameOver = false;
    apple = {
        x: Math.floor(Math.random() * (canvas.width / blockSize)),
        y: Math.floor(Math.random() * (canvas.height / blockSize))
    };

    gameLoopInterval = setInterval(gameLoop, playerSnake.speed);
}


function drawApple() {
    ctx.fillStyle = '#D73340';
    ctx.fillRect(apple.x * blockSize, apple.y * blockSize, blockSize, blockSize);
}


function generateNewApple() {
    do {
        apple = {
            x: Math.floor(Math.random() * (canvas.width / blockSize)),
            y: Math.floor(Math.random() * (canvas.height / blockSize))
        };
    } while (isAppleOnSnake());
}


function isAppleOnSnake() {
    for (let i = 0; i < playerSnake.body.length; i++) {
        if (apple.x === playerSnake.body[i].x && apple.y === playerSnake.body[i].y) {
            return true;
        }
    }
    return false;
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function gameLoop() {
    if (!playerSnake.gameOver) {
        clearCanvas();
        playerSnake.update();
        playerSnake.checkCollision();
        playerSnake.draw();
        drawApple();
    } else {
        clearInterval(gameLoopInterval);
        mainMenu.style.display = "block";
    }
}


function gameOver() {
    playerSnake.gameOver = true;
}

document.addEventListener("keydown", playerSnake.changeDirection);
