/**
 * Creates and solves a sudoku board on the html page.
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(event) {
    event.preventDefault();
    
    const sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(''));

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            if (cell.value != "") {
                sudokuBoard[row][col] = cell.value.charAt(0);
            }
            else {
                sudokuBoard[row][col] = '';
            }
        }
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudokuBoard[row][col] !== '' && !allowed(sudokuBoard[row][col], row, col, sudokuBoard)) {
                console.log("Not a valid board");
                document.getElementById("error-message").classList.remove("d-none");

                document.getElementById("ok-button").onclick = function() {
                    document.getElementById("error-message").classList.add("d-none");
                };
                return false;
            }
        }
    }

    return backtrack(sudokuBoard, 0, 0);
}

/**
 * Algorithm to complete and populate the board recursively.
 * @param {character[][]} board 
 * @param {Integer} r 
 * @param {Integer} c 
 * @returns {boolean}
 */
var backtrack = async function(board, r, c) {
    if (r > 8) {
        return true;
    }
    if (c > 8) {
        return backtrack(board, r + 1, 0);
    }
    
    if (board[r][c] !== '') {
        return backtrack(board, r, c + 1);
    }
    else {
        for (let i = 1; i < 10; i++) {
            let char = String(i);
            if (allowed(char, r, c, board)) {
                board[r][c] = char;
                const cell = document.getElementById(`cell-${r}-${c}`);
                cell.value = board[r][c];

                await sleep(20);
                if (await backtrack(board, r, c + 1)) {
                    return true;
                }

                board[r][c] = '';
                cell.value = "";

                await sleep(20);
            }
        }
    }
    return false;
}

/**
 * Checks if the given item is allowed on the board and returns true or false.
 * @param {character} num 
 * @param {Integer} r 
 * @param {Integer} c 
 * @param {character[][]} board 
 * @returns {boolean}
 */
var allowed = function(num, r, c, board) {
    let gridRowStart = Math.floor(r / 3) * 3;
    let gridColStart = Math.floor(c / 3) * 3;

    if (num === '0') {
        return false;
    }

    for (let i = 0; i < 9; i++) {
        if ((board[r][i] === num && i !== c) || (board[i][c] === num && i !== r)) {
            return false;
        }
        if (board[gridRowStart + Math.floor(i / 3)][gridColStart + (i % 3)] === num && 
            (gridRowStart + Math.floor(i / 3) !== r || gridColStart + (i % 3) !== c)) {
            return false;
        }
    }

    return true;
}

/**
 * Clears the board on the html page.
 */
var clearBoard = function() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            cell.value = "";
        }
    }
}

/**
 * Function to allow the solver to pause whilst ongoing.
 * @param {integer} ms 
 * @returns 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}