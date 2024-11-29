let score = 0; 
let canoPontuado = false; 

const scoreElement = document.querySelector('.score'); 
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
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


    if (pipePosition < 0 && !canoPontuado && marioPosition > 80) {
        score++; // Incrementa a pontuação
        scoreElement.textContent = `Pontuação: ${score}`; // Atualiza o elemento de pontuação
        canoPontuado = true; // Marca o cano como pontuado
    }


    if (pipePosition < -80) {
        canoPontuado = false;
    }
}, 10);

document.addEventListener('keydown', jump);

