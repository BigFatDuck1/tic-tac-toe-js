
//Make gameboard
let gameboardModule = (function (){
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
                gameboard.push([w, h]); //Coordinates
            }
        }
            
    }

    //Just console logs the gameboard, so you can see everything in the console
    function logBoard() {
        console.log(gameboard)
    }
    
    //
    function updateBoard(coordinateX, coordinateY, move) {

        //TODO: Rethink this part as it only changes one part of the cell??
        //TODO: maybe assign each cell (array) with a unique id,
        //TODO: that corresponds to magic square, so checking for win condition is easy (just check the sum of the array = 15)

        this.gameboard[coordinateX][coordinateY] = move;

        return {gameboard};
    }

    return {gameboard, makeBoard, logBoard, updateBoard}
    
})();

//Using IIFE module here is good because gameboardModule is the only variable in the global namespace
//height and width are private properties but can be changed with setDimensions(h,w)
gameboardModule.makeBoard(); //Makes the gameboard
gameboardModule.logBoard(); //Logs the gameboard to the console

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