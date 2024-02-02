const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const blockSize = 20;

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
            document.getElementById("player-score").innerText = this.length;
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

    gameLoop();
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
        setTimeout(gameLoop, playerSnake.speed);
    }
}


async function gameOver() {
    playerSnake.gameOver = true;
    document.getElementById("game-over").style.display = "block";
    await waitingKeypress();
    document.getElementById("game-over").style.display = "none";
    clearCanvas();
    document.getElementById("player-score").innerText = 1;
    initGame();
}


function waitingKeypress() {
    return new Promise((resolve) => {
      document.addEventListener('keydown', onKeyHandler);
      function onKeyHandler(e) {
        if (e.keyCode === 13) {
          document.removeEventListener('keydown', onKeyHandler);
          resolve();
        }
      }
    });
}

document.addEventListener("keydown", playerSnake.changeDirection);

initGame();
