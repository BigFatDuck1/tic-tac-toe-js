
//Make gameboard
let makeGameboard = (function (){
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

    makeBoard();

    return {gameboard}
    
})();

console.log(makeGameboard.gameboard);