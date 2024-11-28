let score = 0; 
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

    
        alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    }

    if (pipePosition < 0 && marioPosition > 80 && !pipe.classList.contains('scored')) {
        score++; // Incrementa a pontuação
        scoreElement.textContent = `Pontuação: ${score}`; 
        pipe.classList.add('scored'); 
    }


    if (pipePosition < -80) {
        pipe.classList.remove('scored');
    }
}, 10);

document.addEventListener('keydown', jump);
