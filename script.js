
//Make gameboard
let makeGameboard = {
    gameboard: [],

    height: 3,
    width: 3,

    makeBoard: function() {
        //Make rows
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                //Make columns
                this.gameboard.push([i,j]); //Coordinates
            }            
        }
        return this.gameboard;
    },
    
};

makeGameboard.makeBoard();
console.log(makeGameboard.gameboard);