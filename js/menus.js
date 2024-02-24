startGameBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
        mainMenu.style.display = 'none';
        initGame();
    } else {
        alert('Veuillez saisir un surnom valide.');
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
