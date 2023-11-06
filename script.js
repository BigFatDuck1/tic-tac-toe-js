
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

    function logBoard() {
        console.log(gameboard);
    }


    return {gameboard, makeBoard, logBoard, appendThirdOrderSquare, setDimensions}
    
})();

//Using IIFE module here is good because gameboardModule is the only variable in the global namespace
//height and width are private properties but can be changed with setDimensions(h,w)
gameboardModule.makeBoard();
gameboardModule.appendThirdOrderSquare(gameboardModule.gameboard);
gameboardModule.logBoard();

//Player factory
function createPlayer(name, order) {

    return { name, order }
}