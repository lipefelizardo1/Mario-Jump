const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('start-button');
const gameBoard = document.querySelector('.game-board');
const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');
const scoreElement = document.querySelector('.score'); // Seleciona o elemento da pontuação

let gameStarted = false;
let score = 0; // Pontuação atual
let highScore = 0; // Maior pontuação registrada

// Função para atualizar o placar
const updateScore = () => {
    scoreElement.textContent = `Pontuação: ${score} | Recorde: ${highScore}`;
};

// Função para iniciar o jogo
const startGame = () => {
    if (!gameStarted) {
        gameStarted = true;
        score = 0; // Reseta a pontuação
        updateScore(); // Atualiza o placar
        startScreen.classList.add('hidden'); // Esconde a tela inicial com transição
        gameBoard.classList.add('game-started'); // Ativa as animações
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

    const pipePosition = pipe.offsetLeft; // Posição horizontal do pipe
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Detecta colisão
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
        if (score > highScore) {
            highScore = score;
            updateScore();
        }
        return;
    }

    // Incrementa a pontuação quando o Mario ultrapassa o pipe
    if (pipePosition < 0 && pipePosition > -100 && !pipe.classList.contains('scored')) {
        score++; // Incrementa pontuação
        updateScore(); // Atualiza o placar
        pipe.classList.add('scored'); // Marca o obstáculo como "pontuado"
    }

    // Remove a classe "scored" quando o pipe volta para a posição inicial
    if (pipePosition <= -100) {
        pipe.classList.remove('scored');
    }
}, 10);
