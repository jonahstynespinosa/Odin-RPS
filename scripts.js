const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const resultDisplay = document.getElementById('resultDisplay');
const restartBtn = document.getElementById('restartBtn');
const scoreboard = document.querySelector('.scoreboard');

const WINNING_SCORE = 5;

let score = { player: 0, computer: 0, ties: 0 };
let gameOver = false;

rock.addEventListener('click', () => playRound('rock'));
paper.addEventListener('click', () => playRound('paper'));
scissors.addEventListener('click', () => playRound('scissors'));
restartBtn.addEventListener('click', restartGame);

updateScoreElement(); // initial render

function playRound(playerChoice) {
  if (gameOver) return;
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  resultDisplay.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
    let result;
    if (player === computer) {
        score.ties += 1;
        result = "It's a tie!";
    } else if ((player === 'rock' && computer === 'scissors') ||
               (player === 'paper' && computer === 'rock') ||
               (player === 'scissors' && computer === 'paper')) {
        score.player += 1;
        result = "You win!";
    } else {
        score.computer += 1;
        result = "Computer wins!";
    }
    updateScoreElement();
    if (score.player >= WINNING_SCORE || score.computer >= WINNING_SCORE) {
        endGame();
    }
    return result;
}

function updateScoreElement() {
  document.querySelector('.scoreboard').innerHTML = `Wins: ${score.player}, Losses: ${score.computer}, Ties: ${score.ties}`;
}

function endGame() {
    gameOver = true;
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.style.display = 'block';
    restartBtn.classList.add('restBtn');

    if (score.player >= WINNING_SCORE) {
        resultDisplay.textContent = "Congratulations! You won the game!";
    } else if (score.computer >= WINNING_SCORE) {
        resultDisplay.textContent = "Game over! The computer won the game.";
    }
}

function restartGame() {
    gameOver = false;
    score = { player: 0, computer: 0, ties: 0 };
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
    document.getElementById('restartBtn').style.display = 'none';
    resultDisplay.textContent = '';
    updateScoreElement();
}
