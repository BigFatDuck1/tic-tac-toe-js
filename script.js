
//Make gameboard
let gameboardModule = (function (){
    let gameboard = [];

    let height = 3;
    let width = 3;

    function makeBoard() {
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                gameboard.push([w, h]); //Coordinates
            }
        }
            
    }

    function logBoard() {
        console.log(gameboard)
    }

    makeBoard();

    return {gameboard, makeBoard, logBoard}
    
})();

gameboardModule.logBoard();