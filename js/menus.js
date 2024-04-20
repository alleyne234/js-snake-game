startGameBtn.addEventListener('click', () => {
    mainMenu.classList.add('hide');
    initGame();
});

settingsBtn.addEventListener('click', () => {
    mainMenu.classList.add('hide');
    settingsMenu.classList.remove('hide');
});

backToMenuBtn.addEventListener('click', () => {
    settingsMenu.classList.add('hide');
    mainMenu.classList.remove('hide');
});

gridSize.addEventListener('change', () => {
    canvas.width = gridSize.value * blockSize;
    canvas.height = gridSize.value * blockSize;
});
