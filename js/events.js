// Start game button
startGameBtn.addEventListener('click', () => {
    mainMenu.classList.add('hide');
    initGame();
});

// Start game keys
document.addEventListener("keydown", (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && playerSnake.gameOver) {
        mainMenu.classList.add('hide');
        initGame();
    }
});

// Stop game keys
document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        playerSnake.gameOver = true;
    }
});

// Setting menu button
settingsBtn.addEventListener('click', () => {
    mainMenu.classList.add('hide');
    settingsMenu.classList.remove('hide');
});

// Change grid size
gridSize.addEventListener('change', () => {
    canvas.width = gridSize.value * blockSize;
    canvas.height = gridSize.value * blockSize;
});

// Back to menu button
backToMenuBtn.addEventListener('click', () => {
    settingsMenu.classList.add('hide');
    mainMenu.classList.remove('hide');
});
