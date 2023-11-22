
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

        if (board[square][0] != "") {
            //There is already a move there, return error
            return "error";
        }

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

        const coord_converted = {
            4: 0,
            9: 1,
            2: 2,
            3: 3,
            5: 4,
            7: 5,
            8: 6,
            1: 7,
            6: 8, 
        }

        let winner = { //Default state is lose i.e. no winner
            result: false,
            winner: "",
            coordinates: [],
        }

        function checkSquares(set) {
            //Set is the array containing the squares in the row/column/diagonal
            //e.g. [board[0], board[1], board[2]
            let sum = 0;
            let characters = [];
            set.forEach(element => {
                if (element[0] == 1 || element[0] == 2) {
                    sum += element[1];
                    characters.push(element[0]);
                }
            });

            //Arrays can't be compared with == since they are a type of objects
            //["O", "O", "O"] == ["O", "O", "O"] returns false
            characters = characters.toString(); 
            

            //If win detected
            if (sum == 15 && (characters == "1,1,1" || characters == "2,2,2")) {
                //Only update if there is a winner
                winner.result = true;
                winner.winner = set[0][0];
                winner.coordinates = [
                coord_converted[set[0][1]], 
                coord_converted[set[1][1]], 
                coord_converted[set[2][1]]];

                return winner;
                
            }
            
        }

        let check_these = [row1, row2, row3, column1, column2, column3, diagonal1, diagonal2];
        check_these.forEach(element => {
            checkSquares(element);
        })

        return winner; //Default state is lose i.e. no winner
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

    let nth_turn = 1; //Start with 1st turn

    function nextTurn(current_player) {
        //gameFlow.whoseTurn returns the opposite of the current player
        return 3 - current_player;
    }

    function incrementTurn() {
        return nth_turn++;
    }

    function showTurnCount() {
        return nth_turn;
    }

    function promptPlayer(player) {
        let current_player = player;
        let move = prompt(`${player}'s move`);
        return {move, current_player};
    }

    return {nextTurn, promptPlayer, incrementTurn, showTurnCount, nth_turn}

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
let current_player = 1; //Start with Player 1 which is O;

//4. DOMHandling IIFE
const DOMHandling = (
    function() {
        
        function clearBoard() {
            let tiles = document.querySelectorAll(".tile");
            tiles.forEach((element) => {
                element.textContent = "";
            })
        }

        //This function takes a click from the player and returns the coordinate that was clicked

        function clickMove(func) {
            let tiles = document.querySelectorAll(".tile");
            let one_round_function = func; //The function that was passed as an argument is stored in a variable

            tiles.forEach((element) => {
                element.addEventListener("click", function inputMove() {
                    let move = element.dataset.coord;
                    one_round_function(move); //That stored function (from parameter) is called with an argument
                    return {move, current_player};
                    //current_player variable is bad practice because it is something that exists in the global scope
                })
            })
        }

        function fillTile(move) {
            document.querySelector(`[data-coord="${move}"]`).textContent = current_player == 1 ? "O" : "X";
        }

        function gameEnd() {
            let tiles = document.querySelectorAll(".tile");

            tiles.forEach((element) => {
                //Clone node only clones the node but not any of its event listeners
                element.replaceWith(element.cloneNode(true));
                
            });
        }

        function updateResult(result) {
            if (result.winner == "") {
                return "No results yet"
            }
            else if (result.winner == "Draw") {
                document.querySelector(".result").textContent = "Draw";
            }
            else {
                document.querySelector(".result").textContent = `Winner: Player ${result.winner}`;
            }
        }

        return { clearBoard, clickMove, fillTile, gameEnd, updateResult }
    }

)();

//For DOM version only
let sound = new Audio("assets/sounds/capture.mp3");

function oneRoundDOM(move) { //Call this after player has clicked on a tile
    const tile_update = gameboardModule.updateBoard(move, current_player, gameboard);
    //Check for whether a move is possible or whether the tile is already filled
    if (tile_update == "error") {
        return "error";
    }
    //Update the DOM (because so far only the "backend" has been updated)
    DOMHandling.fillTile(move);
    sound.play();
    let turn = gameFlow.incrementTurn(); //Increment turn

    //Check if there is a winner
    const result = gameboardModule.checkWin(gameboard);
    DOMHandling.updateResult(result);
    //If there is a winner:
    if (result.result == true) {
        console.log(`Winner: ${result.winner}`);
        DOMHandling.gameEnd();
        return result;
    }
    //Check for draw
    if (turn == 9) {
        result.winner = "Draw";
        console.log(result.winner);
        return result;
    }
    //Change variable so it is the next player's turn
    current_player = gameFlow.nextTurn(current_player);
}

//Game flow
DOMHandling.clearBoard();
DOMHandling.clickMove(oneRoundDOM);

//Restart game






















// _______________________
//For console version only
function oneRoundConsole() {
    
    //Input must be in the form of a "coordinate" for a square i.e. 0-8
    let move = gameFlow.promptPlayer(current_player); 
    console.log(move);

    let side = current_player == 1 ? "O" : "X";
    let valid_move = gameboardModule.updateBoard(move.move, side, gameboard);
    if (valid_move == "error") {
        console.log("Invalid move");
        oneRound();
    }

    gameFlow.nth_turn++; //Increment turn
    let result = gameboardModule.checkWin(gameboard);
    if (result.result == false) {
        if (gameFlow.nth_turn < 9) { //Continue game if no winner and less than 9 turns
            current_player = gameFlow.nextTurn(current_player);
            oneRound();
        }
        else if (gameFlow.nth_turn == 9) { //Draw
            result.winner = "Draw";
            console.log(winner);
            return winner;
        }
    }
    else if (result.result == true) {
        console.log(`Winner: ${result.winner}`);
        return result;
    }
}

// oneRound()