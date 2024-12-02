const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('start-button');
const gameBoard = document.querySelector('.game-board');
const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');
const scoreElement = document.querySelector('.score'); // Seleciona o elemento da pontuação

let gameStarted = false;
let score = 0; // Inicializa a pontuação

// Função para atualizar a pontuação
const updateScore = () => {
    if (gameStarted) {
        score += 1; // Incrementa a pontuação
        scoreElement.textContent = `Pontuação: ${score}`; // Atualiza o texto no HTML
    }
};

// Função para iniciar o jogo
const startGame = () => {
    if (!gameStarted) {
        gameStarted = true;
        score = 0; // Reseta a pontuação ao iniciar um novo jogo
        scoreElement.textContent = `Pontuação: ${score}`;
        startScreen.classList.add('hidden'); // Esconde a tela inicial com transição
        gameBoard.classList.add('game-started'); // Ativa as animações

        // Inicia o contador de pontuação
        setInterval(updateScore, 100); // Atualiza a pontuação a cada 100ms
    }
};

// Evento para fazer o Mario pular
const jump = () => {
    if (!gameStarted) return;

    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500); // Remove a classe de pulo após 500ms
    }
};

// Eventos para iniciar o jogo
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
    }
    if (!gameStarted) startGame();
});
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
        alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    }
}, 10);
