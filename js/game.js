const ctx = canvas.getContext("2d");
const blockSize = 20;

let apple = {};
let gameLoopInterval;

const snake = {
    body: [],
    length: 0,
    direction: { x: 0, y: 0},
    speed: 0,
    gameOver: false,

    draw: function() {
        ctx.fillStyle = '#285CC4';
        this.body.forEach((block, index) => {
            if (index === 0) {
                ctx.fillStyle = '#143464';
            }
            ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
            ctx.fillStyle = '#285CC4';
        });
    },
    
    update: function() {
        const newHead = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };

        this.body.unshift(newHead);
    
        if (newHead.x === apple.x && newHead.y === apple.y) {
            this.length++;
            playerScore.innerText = this.length - 1;
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
    playerSnake.speed = 1000 / snakeSpeed.value;
    playerSnake.gameOver = false;
    apple = {
        x: Math.floor(Math.random() * (canvas.width / blockSize)),
        y: Math.floor(Math.random() * (canvas.height / blockSize))
    };

    playerScore.innerText = playerSnake.length - 1;
    gameLoopInterval = setInterval(gameLoop, playerSnake.speed);
}


function drawApple() {
    ctx.fillStyle = '#DF3E23';
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
        mainMenu.classList.remove('hide');

        if (playerSnake.length > bestScore.innerText) {
            bestScore.innerText = playerSnake.length - 1;
        }
    }
}


function gameOver() {
    playerSnake.gameOver = true;
}

document.addEventListener("keydown", playerSnake.changeDirection);
