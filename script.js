
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

    function checkWin(side, board) { //Check for X or O?
        //Whenever a move has been made, call this function
        //Collects all non-empty squares into a new array
        let filled_squares = [];
        let i = 0;
        let purge_these = [];

        board.forEach((element) => {

            if (element[0] == side) {
                filled_squares.push(element);
                purge_these.push(i);
            }
            i++;
        });

        //If there are less than three squares, return false
        if (filled_squares.length < 3) {
            return {result: false, purge_these};
        }

        //If there are three squares, check if they are in a row
        let running_total = 0;
        filled_squares.forEach((element) => {
            running_total += element[1];
        })

        if (running_total == 15) {
            return true; //Won
        }
        else {
            let result = false;
            return {result, purge_these}; //Didn't win
        }
    }

    //Set moves that have been done to =0, effectively clearing that square
    function purgeIndices(array, board) {
        for (let element of array) {
            board[element][1] = 0;
        }
    }

    return {
            makeBoard, 
            logBoard, 
            appendThirdOrderSquare, 
            setDimensions, 
            updateBoard, 
            checkWin, 
            purgeIndices,}
    
})();

//Player factory
function createPlayer(name, order) {

    //Order: is it player 1 or player 2? 
    //gameFlow.whoseTurn returns the opposite of the current player

    return { name, order }
}

//Game order
const gameFlow = (function () {

    function nextTurn(current_player) {
        //gameFlow.whoseTurn returns the opposite of the current player
        return 3 - current_player;
    }

    function promptPlayer(player) {
        let current_player = player;
        let move = prompt(`${player}'s move`);
        return {move, current_player};
    }

    return {nextTurn, promptPlayer}

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
let current_player = 1; //Start with Player 1


function oneRound() {
    let move = gameFlow.promptPlayer(current_player); //Input must be in the form of a "coordinate" for a square i.e. 0-8
    let side = current_player == 1 ? "O" : "X";
    gameboardModule.updateBoard(move.move, side, gameboard);
    let result = gameboardModule.checkWin(side, gameboard);
    console.log(result);
    if (result.result == false) {
        gameboardModule.purgeIndices(result.purge_these, gameboard);
        console.log("Purge")
        current_player = gameFlow.nextTurn(current_player);
        state = "Neutral";
        oneRound();

    }
    else {
        // console.log(`Player ${current_player} wins`);
        state = "Win";
        console.log(state);
        return state;
    }
}

state = oneRound();


//!Test (debug)
// gameboardModule.updateBoard(1, "X");
// gameboardModule.updateBoard(5, "X");
// gameboardModule.updateBoard(7, "X");
// let result = gameboardModule.checkWin("X"); => lose
//Only purge if lose
// if (result == "false") {
//     gameboardModule.purgeIndices(result.purge_these);
// }