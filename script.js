let gameArea = document.getElementById('gameArea');
let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');
let scoreDisplay = document.getElementById('score');
let highScoreDisplay = document.getElementById('highScore');
let pauseButton = document.getElementById('pauseButton');
let startScreen = document.getElementById('startScreen');
let startButton = document.getElementById('startButton');
let playerNameInput = document.getElementById('playerName');

let paddleWidth = 100;
let gameAreaWidth = 800;
let ballSize = 20;

let ballSpeed = 4;
let ballDirectionX = Math.random() > 0.5 ? 1 : -1;
let ballDirectionY = 1;

let ballX = gameAreaWidth / 2;
let ballY = 0;

let paddleX = gameAreaWidth / 2 - paddleWidth / 2;
let score = 0;
let highScore = 0;
let playerName = '';
let gamePaused = false;

document.addEventListener('mousemove', (event) => {
    if (!gamePaused) {
        paddleX = event.clientX - gameArea.offsetLeft - paddleWidth / 2;
        if (paddleX < 0) paddleX = 0;
        if (paddleX > gameAreaWidth - paddleWidth) paddleX = gameAreaWidth - paddleWidth;
        paddle.style.left = paddleX + 'px';
    }
});

pauseButton.addEventListener('click', () => {
    gamePaused = !gamePaused;
    pauseButton.textContent = gamePaused ? 'Resume' : 'Pause';
});

startButton.addEventListener('click', () => {
    playerName = playerNameInput.value;
    if (playerName) {
        startScreen.style.display = 'none';
        gameArea.style.display = 'block';
        resetGame();
        gameLoop();
    } else {
        alert('Please enter your name to start the game.');
    }
});

function gameLoop() {
    if (!gamePaused) {
        ballX += ballSpeed * ballDirectionX;
        ballY += ballSpeed * ballDirectionY;

        if (ballX <= 0 || ballX >= gameAreaWidth - ballSize) {
            ballDirectionX *= -1;
        }
        if (ballY <= 0) {
            ballDirectionY *= -1;
        }
        if (ballY >= gameArea.offsetHeight - ballSize) {
            if (ballX + ballSize > paddleX && ballX < paddleX + paddleWidth) {
                ballDirectionY *= -1;
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
                ballSpeed += 0.5;
            } else {
                if (score > highScore) {
                    highScore = score;
                    highScoreDisplay.textContent = 'High Score: ' + highScore;
                    alert('Game Over. New High Score: ' + highScore);
                } else {
                    alert('Game Over. Your score is ' + score);
                }
                resetGame();
            }
        }

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    ballX = gameAreaWidth / 2;
    ballY = 0;
    ballSpeed = 4;
    ballDirectionX = Math.random() > 0.5 ? 1 : -1;
    ballDirectionY = 1;
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    pauseButton.textContent = 'Pause';
    gamePaused = false;
}