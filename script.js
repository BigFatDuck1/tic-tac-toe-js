
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

    makeBoard();

    return {gameboard, makeBoard, logBoard}
    
})();

//Using IIFE module here is good because gameboardModule is the only variable in the global namespace
//height and width are private properties but can be changed with setDimensions(h,w)
gameboardModule.logBoard();

//Player factory
function createPlayer(name, order) {

    return { name, order }
}