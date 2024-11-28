let score = 0; // Variável para armazenar a pontuação
const scoreElement = document.querySelector('.score'); // Seleciona o elemento de pontuação
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

// Array para armazenar os canos já pontuados
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

        // Exibe mensagem de fim de jogo
        alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    }

    // Verifica se o Mario passou sobre o cano sem colisão
    if (pipePosition > 0 && pipePosition < 120 && marioPosition > 80) {
        if (!scoredPipes.includes(pipePosition)) {
            score++; // Incrementa a pontuação
            scoreElement.textContent = `Pontuação: ${score}`; // Atualiza a pontuação na tela
            scoredPipes.push(pipePosition); // Adiciona o cano atual à lista de canos pontuados
        }
    }

    // Limpa os canos que já saíram da tela para manter o array eficiente
    scoredPipes = scoredPipes.filter((pos) => pos > pipePosition);

}, 10);

document.addEventListener('keydown', jump);
