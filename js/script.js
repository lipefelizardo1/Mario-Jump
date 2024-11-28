let score = 0; 
const scoreElement = document.querySelector('.score'); 
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startScreen = document.querySelector('.start-screen');
const gameBoard = document.querySelector('.game-board');

const startGame = () => {
    startScreen.style.display = 'none'; 
    gameBoard.style.display = 'block';  
};

document.addEventListener('keydown', startGame);


const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

// Variável para armazenar se o cano já foi pontuado
let scoredPipes = [];

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft; // Posição do cano
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // Altura do Mario

    // Verifica se o Mario colidiu com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

        
        /*alert(`Fim de jogo! Sua pontuação foi: ${score}`); */
    }

    // Verifica se o Mario passou sobre o cano sem colisão
    if (pipePosition > 0 && pipePosition < 120 && marioPosition > 80) {
        // Se o cano não foi pontuado ainda, incrementa a pontuação
        if (!scoredPipes.includes(pipePosition)) {
            score++; // Incrementa a pontuação
            scoreElement.textContent = `Pontuação: ${score}`; // Atualiza a pontuação na tela
            scoredPipes.push(pipePosition); // Marca o cano como já pontuado
        }
    }

    // Limpa a lista de canos pontuados para evitar problemas ao usar múltiplos canos
    if (pipePosition < -80) {
        scoredPipes = scoredPipes.filter(pos => pos !== pipePosition);
    }

}, 10);

document.addEventListener('keydown', jump);
