// src/__tests__/game.test.js
import { initializeGame, updateScore, move, checkGameOver } from '../script.js';

// Before running the tests, we need to set up our mock DOM
describe('2048 Game Tests', () => {
    beforeAll(() => {
        // Set up the mock DOM
        document.body.innerHTML = `
            <div id="current-score">0</div>
            <div id="high-score">0</div>
            <div id="game-over" style="display: none;"></div>
            <button id="restart-btn">Restart</button>
            <div class="grid"></div>
        `;
        
        // Initialise the game to ensure all necessary setup occurs
        initializeGame();
    });

    beforeEach(() => {
        // Reset the game before each test if needed
    });

    test('should initialize the game', () => {
        expect(document.getElementById('current-score').textContent).toBe('0');
        expect(document.getElementById('high-score').textContent).toBe('0');
        // Check if the game board is initialized correctly (e.g., all cells are 0)
        const gridCells = document.querySelectorAll('.grid div');
        gridCells.forEach(cell => {
            expect(cell.textContent).toBe('0'); // Adjust based on how you render cells
        });
    });

    test('should update the score correctly', () => {
        // Simulate some score update logic
        updateScore(10);
        expect(document.getElementById('current-score').textContent).toBe('10');
    });

    test('should handle restart button click', () => {
        const restartBtn = document.getElementById('restart-btn');
        
        // Simulate button click (you would implement the actual restart logic in your script)
        restartBtn.click(); // Ensure this calls the restartGame function
        
        // Check if score is reset (you need to ensure the restart logic is implemented in your script)
        expect(document.getElementById('current-score').textContent).toBe('0');
    });

    // Additional tests for game functionality
    test('should move tiles correctly', () => {
        // Set up a specific board state
        // and then call the move function to check if it behaves as expected
        const initialBoardState = [
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        // Mock the board state if needed or set it up in your initializeGame
        move('left'); // Example move direction

        // Check the expected board state after the move
        // Get the board state for validation
    });

    test('should check game over condition correctly', () => {
        // Set up a board state that is game over
        // Call the checkGameOver function and assert the expected behavior
        const isGameOver = checkGameOver(); 
        expect(isGameOver).toBe(true); 
    });
});
