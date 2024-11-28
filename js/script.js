let score = 0; // Variável para armazenar a pontuação
let canoPontuado = false; // Variável auxiliar para rastrear se o cano foi pontuado

const scoreElement = document.querySelector('.score'); // Seleciona o elemento de pontuação
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

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

        // Exibe mensagem de fim de jogo
        alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    }

    // Verifica se o Mario passou sobre o cano sem colisão
    if (pipePosition < 0 && !canoPontuado && marioPosition > 80) {
        score++; // Incrementa a pontuação
        scoreElement.textContent = `Pontuação: ${score}`; // Atualiza o elemento de pontuação
        canoPontuado = true; // Marca o cano como pontuado
    }

    // Reseta a variável de pontuação para o próximo cano
    if (pipePosition < -80) {
        canoPontuado = false;
    }
}, 10);

document.addEventListener('keydown', jump);
