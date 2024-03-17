startGameBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
        mainMenu.style.display = 'none';
        initGame();
    } else {
        alert('Please enter a nickname.');
    }
});

settingsBtn.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    settingsMenu.style.display = 'block';
});

backToMenuBtn.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
    mainMenu.style.display = 'block';
});

gridSize.addEventListener('change', () => {
    canvas.width = gridSize.value * blockSize;
    canvas.height = gridSize.value * blockSize;
});
