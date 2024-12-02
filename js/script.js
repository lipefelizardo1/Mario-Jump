const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('start-button');
const gameBoard = document.querySelector('.game-board');
const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');

let gameStarted = false;

// Função para iniciar o jogo
const startGame = () => {
    if (!gameStarted) {
        gameStarted = true;
        startScreen.classList.add('hidden'); // Esconde a tela inicial com transição
        gameBoard.classList.add('game-started'); // Ativa as animações
    }
};

// Eventos para iniciar o jogo
document.addEventListener('keydown', startGame);
startButton.addEventListener('click', startGame);

// Lógica do jogo
const loop = setInterval(() => {
    if (!gameStarted) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
        alert('Fim de jogo!');
    }
}, 10);
