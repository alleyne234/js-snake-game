const backToMenuBtn = document.getElementById('back-to-menu-btn');
const mainMenu = document.getElementById('main-menu');
const playerNameInput = document.getElementById('player-name');
const settingsBtn = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('settings-menu');
const startGameBtn = document.getElementById('start-game-btn');

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
