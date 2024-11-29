const startScreen = document.querySelector('.start-screen'); // Tela de início
const gameBoard = document.querySelector('.game-board'); // Área do jogo
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const mario = document.querySelector('.mario');

let gameStarted = false; // Controle se o jogo começou ou não

// Função para iniciar o jogo
const startGame = () => {
    if (!gameStarted) {
        gameStarted = true; // Marca que o jogo começou
        startScreen.style.display = 'none'; // Esconde a tela inicial
        gameBoard.classList.add('game-started'); // Ativa as animações
    }
};

// Evento para iniciar o jogo
document.addEventListener('keydown', startGame);

// Movimento do Mario e lógica do jogo
const loop = setInterval(() => {
    if (!gameStarted) return; // Não faz nada enquanto o jogo não começou

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Verifica se há colisão
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
