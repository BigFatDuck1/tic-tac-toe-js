
//Make gameboard
let gameboardModule = (function() {

    let gameboard = [];

    let height = 3;
    let width = 3;

    function setDimensions(h, w) {
        height = h;
        width = w;
    }

    function makeBoard() {
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
    
    //
    function updateBoard(square, move) {

        this.gameboard[square][0] = move;

        console.log(this.gameboard);
        
        return {gameboard};
    }

    function logBoard() {
        console.log(gameboard);
    }

    function checkWin(side) { //Check for X or O?
        //Whenever a move has been made, call this function
        //Collects all non-empty squares into a new array
        let filled_squares = [];
        let i = 0;
        let purge_these = [];

        this.gameboard.forEach((element) => {

            if (element[0] == side) {
                filled_squares.push(element);
                //TODO: clear this after done debugging
                console.log(filled_squares);
                console.log(i);

                purge_these.push(i);
            }
            i++;
        });

        //If there are less than three squares, return false
        if (filled_squares.length < 3) {
            return false;
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

    function purgeIndices(array) {
        for (let element of array) {
            this.gameboard[element][1] = 0;
            //TODO: clear after debug
            console.log(this.gameboard);
        }
    }

    return {gameboard, makeBoard, logBoard, appendThirdOrderSquare, setDimensions, updateBoard, checkWin, purgeIndices}
    
})();

//Using IIFE module here is good because gameboardModule is the only variable in the global namespace
//height and width are private properties but can be changed with setDimensions(h,w)
gameboardModule.makeBoard();
gameboardModule.appendThirdOrderSquare(gameboardModule.gameboard);
gameboardModule.logBoard();
//!Test
gameboardModule.updateBoard(1, "X");
gameboardModule.updateBoard(5, "X");
gameboardModule.updateBoard(7, "X");
let result = gameboardModule.checkWin("X"); //Lose
gameboardModule.purgeIndices(result.purge_these);

//Player factory
function createPlayer(name, order) {

    //Order: is it player 1 or player 2? 
    //gameFlow.whoseTurn returns the opposite of the current player

    return { name, order }
}

//Game order
const gameFlow = (function () {

    function whoseTurn(current_player) {
        //gameFlow.whoseTurn returns the opposite of the current player
        return 3 - current_player;
    }

    function promptPlayer(player) {
        let current_player = player;
        let move = prompt(`${player}'s move`);
        return {move, current_player};
    }

})();

//Trying out the game in console

//1. Create players
let player1 = createPlayer("Player 1", 1);
let player2 = createPlayer("Player 2", 2);