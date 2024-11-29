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

let scoredPipes = [];

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

        
    }

    if (pipePosition > 0 && pipePosition < 120 && marioPosition > 80) {
        if (!scoredPipes.includes(pipePosition)) {
            score++; 
            scoreElement.textContent = `Pontuação: ${score}`; 
            scoredPipes.push(pipePosition); 
        }
    }

    
    if (pipePosition < -80) {
        scoredPipes = scoredPipes.filter(pos => pos !== pipePosition);
    }

}, 10);

document.addEventListener('keydown', jump);
