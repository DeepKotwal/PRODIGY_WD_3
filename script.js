// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // X starts the game
let gameState = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true; // Track game status

// Function to handle when a cell is clicked
function handleCellClick(index) {
    if (gameState[index] !== '' || !gameActive) return;

    // Mark the cell with the current player's symbol
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    // Check for a winner
    if (checkWinner()) {
        setTimeout(() => {
            statusText.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        }, 100);
    } else if (gameState.every(cell => cell !== '')) {
        // Check for a draw
        setTimeout(() => {
            statusText.textContent = "It's a draw!";
            gameActive = false;
        }, 100);
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X'; // X starts again
    gameActive = true; // Game is active
    statusText.textContent = "Player X's Turn";
}

// Add event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);
