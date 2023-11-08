
//Gameboard related functions (create, update, checkWin)
let gameboardModule = (function() {

    let height = 3;
    let width = 3;

    function setDimensions(h, w) {
        height = h;
        width = w;
    }

    function makeBoard() {
        let gameboard = [];
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                //gameboard.push([w, h]); //Coordinates
                gameboard.push([""]); //Empty string to fill with move later (X or O)
            }
        }
        return gameboard;        
    }

    function appendThirdOrderSquare(board) {
        let thirdOrderSquareArray = [4,9,2,3,5,7,8,1,6];
        for (let i = 0; i < board.length; i++) {
            board[i].push(thirdOrderSquareArray[i]);
        }
        return board;
    }
    
    
    function updateBoard(square, move, board) {

        board[square][0] = move;
        
        return {board};
    }

    function logBoard(board) {
        console.log(board);
    }

    function checkWin(board) { //Check for X or O?
        //Whenever a move has been made, call this function
        let row1 = [board[0], board[1], board[2]];
        let row2 = [board[3], board[4], board[5]];
        let row3 = [board[6], board[7], board[8]];
        let column1 = [board[0], board[3], board[6]];
        let column2 = [board[1], board[4], board[7]];
        let column3 = [board[2], board[5], board[8]];
        let diagonal1 = [board[0], board[4], board[8]];
        let diagonal2 = [board[2], board[4], board[6]];

        let winner = {
            result: false,
            winner: "",
        }

        function checkSquares(set) {
            //Set is the array containing the squares in the row/column/diagonal
            let sum = 0;
            set.forEach(element => {
                if (element[0] == "O" || element[0] == "X") {
                    sum += element[1];
                }
            });

            //If win detected
            if (sum == 15) {
                winner.result = true;
                winner.winner = set[0][0];
            }
        }

        let check_these = [row1, row2, row3, column1, column2, column3, diagonal1, diagonal2];
        check_these.forEach(element => {
            checkSquares(element);
        })

        return winner; //No winner
    }

    return {
            makeBoard, 
            logBoard, 
            appendThirdOrderSquare, 
            setDimensions, 
            updateBoard, 
            checkWin, 
            }
    
})();

//Player factory
function createPlayer(name, order) {

    //Order: is it player 1 or player 2? 
    //gameFlow.whoseTurn returns the opposite of the current player

    return { name, order }
}

//Game order
const gameFlow = (function () {

    let nth_turn = 0;

    function nextTurn(current_player) {
        //gameFlow.whoseTurn returns the opposite of the current player
        return 3 - current_player;
    }

    function promptPlayer(player) {
        let current_player = player;
        let move = prompt(`${player}'s move`);
        return {move, current_player};
    }

    return {nextTurn, promptPlayer, nth_turn}

})();

//Trying out the game in console

//1. Create players
let player1 = createPlayer("Player 1", 1);
let player2 = createPlayer("Player 2", 2);

//2. Game start initialization 
let gameboard;
(function gameStart() {
    //Using IIFE module here is good because gameboardModule is the only variable in the global namespace
    //height and width are private properties but can be changed with setDimensions(h,w)
    gameboard = gameboardModule.makeBoard();
    gameboardModule.appendThirdOrderSquare(gameboard);
    //gameboardModule.logBoard(); 
})();


//3. Function for one round with checking for win condition
let state = "Neutral" //Win, Neutral, Draw
let current_player = 1; //Start with Player 1 which is O;


function oneRound() {
    let move = gameFlow.promptPlayer(current_player); //Input must be in the form of a "coordinate" for a square i.e. 0-8
    let side = current_player == 1 ? "O" : "X";
    gameboardModule.updateBoard(move.move, side, gameboard);
    gameFlow.nth_turn++; //Increment turn
    let result = gameboardModule.checkWin(gameboard);
    console.log(gameboard);
    console.log(result);
    if (result.result == false) {
        if (gameFlow.nth_turn < 9) {
            current_player = gameFlow.nextTurn(current_player);
            oneRound();
        }
        else if (gameFlow.nth_turn == 9) {
            state = "Draw";
            console.log(state);
        }
    }
    else if (result.result == true) {
        console.log(`Winner: ${result.winner}`);
        return result;
    }
}

state = oneRound();


//!Test (debug)
// gameboardModule.updateBoard(1, "X", gameboard);
// gameboardModule.updateBoard(4, "X", gameboard);
// gameboardModule.updateBoard(7, "X", gameboard);
// console.log(gameboardModule.checkWin(gameboard));
