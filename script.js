document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.querySelector('[data-testid="colorBox"]');
    const colorOptionsContainer = document.querySelector('.color-options');
    const gameStatus = document.querySelector('[data-testid="gameStatus"]');
    const scoreElement = document.querySelector('[data-testid="score"]');
    const newGameButton = document.querySelector('[data-testid="newGameButton"]');
    const startGameButton = document.getElementById('startGameButton');
    const welcomeScreen = document.querySelector('[data-testid="welcomeScreen"]');
    const gameContainer = document.querySelector('.game-container');
    const victoryScreen = document.querySelector('.victory-screen');
    const gameOverScreen = document.querySelector('.game-over-screen');
    const playAgainButton = document.getElementById('playAgainButton');
    const tryAgainButton = document.getElementById('tryAgainButton');
    const lifeElement = document.getElementById('life');
    const checkMark = document.querySelector('.check-mark');
    const xMark = document.querySelector('.x-mark');

    let targetColor;
    let score = 0;
    let life = 3;
    const maxScore = 5;

    const colors = [
         "#FF6F61", "#6B5B95", "#88B04B", "#FFA500", "#92A8D1", "#F7CAC9",
        "#955251", "#B565A7", "#009B77", "#DD4124", "#D65076", "#45B8AC"
    ];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateColorOptions() {
        const options = new Set();
        options.add(targetColor);
        while (options.size < 6) {
            options.add(getRandomColor());
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    function renderColorOptions() {
        colorOptionsContainer.innerHTML = '';
        const options = generateColorOptions();
        options.forEach(color => {
            const button = document.createElement('button');
            button.style.backgroundColor = color;
            button.dataset.testid = 'colorOption';
            button.addEventListener('click', () => handleGuess(color));
            colorOptionsContainer.appendChild(button);
        });
    }

    function showFeedback(isCorrect) {
        const mark = isCorrect ? checkMark : xMark;
        colorBox.classList.add(isCorrect ? 'flash-correct' : 'flash-wrong');
        mark.classList.add('visible');

        setTimeout(() => {
            colorBox.classList.remove('flash-correct', 'flash-wrong');
            mark.classList.remove('visible');
        }, 500);
    }

    function handleGuess(guess) {
        if (guess === targetColor) {
            score++;
            scoreElement.textContent = `${score}/${maxScore}`;
            gameStatus.textContent = 'Correct!🎉';
            gameStatus.style.color = 'green'; 
            showFeedback(true);
            if (score === maxScore) {
                victoryScreen.classList.remove('hidden');
                gameContainer.classList.add('hidden');
            } else {
                startNewRound();
            }
        } else {
            life--;
            lifeElement.textContent = '❤️'.repeat(life);
            gameStatus.textContent = 'Wrong! Try again.😢';
            gameStatus.style.color = 'red'; 
            showFeedback(false);
            if (life === 0) {
                gameOverScreen.classList.remove('hidden');
                gameContainer.classList.add('hidden');
            }
        }
    }

    function startNewRound() {
        targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;
        renderColorOptions();
    }

    function resetGame() {
        score = 0;
        life = 3;
        scoreElement.textContent = `${score}/${maxScore}`;
        lifeElement.textContent = '❤️❤️❤️';
        gameStatus.textContent = 'Make your guess!';
        startNewRound();
    }

    startGameButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame();
    });

    newGameButton.addEventListener('click', resetGame);
    playAgainButton.addEventListener('click', () => {
        victoryScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame();
    });
    tryAgainButton.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame();
    });

    // Initial setup
    resetGame();
});