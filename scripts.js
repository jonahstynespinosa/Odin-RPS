const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const resultDisplay = document.getElementById('resultDisplay');
const WINNING_SCORE = 5;
let score = { player: 0, computer: 0, ties: 0};

document.querySelector('.scoreboard').innerHTML = `Player: ${score.player}, Computer: ${score.computer}, Ties ${score.ties}`;


addEventListener('DOMContentLoaded', () => {
    rock.addEventListener('click', () => playRound('rock'));
    paper.addEventListener('click', () => playRound('paper'));
    scissors.addEventListener('click', () => playRound('scissors'));
});

function playRound(playerChoice) {
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
    return result;
}

function updateScoreElement() {
  document.querySelector('.scoreboard').innerHTML = `Wins: ${score.player}, Losses: ${score.computer}, Ties: ${score.ties}`;
}


