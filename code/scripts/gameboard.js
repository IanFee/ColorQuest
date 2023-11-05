'use strict';

/**
* @function createGameBoard
* This function generates a table with rows and columns based on user input, in addition with a <p> elemnt and a button 
* @param sizeBoard(size of the board)
* @difficulty (the difficulty number)
* @colorChoosenByUser (the color that the user selected)
* @returns nothing
*/
function createGameBoard(sizeBoard, colorChoosenByUser, difficulty) {
    //Gets the section in which the table, progress message, and submit button will be placed and clears any previous elements.
    const boardSection = document.getElementById("gameboard");
    boardSection.textContent = "";

    let board;
    let message;
    let submitGuessesButton;

    /**
     * Responsible for the actual creation of the table, message, and button.
     */
    (function initializeGameboardSection(){
        //Create the table part of the gameboard section
        board = document.createElement('table');
        board.setAttribute("id", "gameboard_table");
        boardSection.appendChild(board);
    
        //Create text message and add it
        message = document.createElement('p');
        message.setAttribute("id", "message");
        boardSection.appendChild(message);
        
    
        //Create submit guessesbutton and add it
        submitGuessesButton = document.createElement('button');
        submitGuessesButton.setAttribute("id", "submit_guesses")
        boardSection.appendChild(submitGuessesButton);
        submitGuessesButton.textContent = "Submit Your Guesses !";
    
        //Creates the table rows and table cells
        for (let i = 0; i < sizeBoard; i++) {
            //Create the table rows
            let rows = document.createElement('tr');
            board.appendChild(rows);
    
            for (let k = 0; k < sizeBoard; k++) {
                //Create the table cells
                let columns = document.createElement('td');
                rows.appendChild(columns);
    
                //Sets the table cell to a random color
                columns.style.backgroundColor = generateRandomColor(difficulty);
            }
        }
    })();

    //Gets number of dominant tiles of chosen color
    let tableCells = getTableCells(board);
    let numberOfTilesRightColor = countNumDomTiles(tableCells, colorChoosenByUser);

    /*Adds a text message inside the <p> element that shows how many tiles are
    * matching the right color and how many are selected !*/
    message.textContent = showGeneralCountMessage(colorChoosenByUser, numberOfTilesRightColor, 0);
    message.style.color = "brown";

    //Event handler for the tiles!
    board.addEventListener("click", boardClickHandler);

    function boardClickHandler(event){
        toggleSelectedTableCell(event);
        let tableCells = getTableCells(board);

        let selectedTableCells = getSelectedTableCells(tableCells)
        let numSelectedCells = selectedTableCells.length;

        //Updates the selcted tiles text message
        message.textContent = showGeneralCountMessage(colorChoosenByUser, numberOfTilesRightColor, numSelectedCells);

        //Disabling/Enabling the submitGuesses button when the user goes over the total num of tiles that match the user selected color
        if (numSelectedCells > numberOfTilesRightColor) {
            submitGuessesButton.disabled = true;
        }
        if (numSelectedCells == numberOfTilesRightColor) {
            submitGuessesButton.disabled = false;
        }
    }

    //Event handler for game submission
    submitGuessesButton.addEventListener('click', gameSubmitHandler);

    //Event handler to check when user initiates cheat mode using their keyboard
    document.addEventListener('keydown', cheatModeHandler);

}


/**
* @function generateRandomColor
* Uses ranNum function to generate a random number, all depnding on the range allowed
* and sets those values into a rgb color.
* @param nothing
* @returns a color in rgb values!
*/
function generateRandomColor(difficulty) {
    /* @function randNum
    * Generates a random number starting from the value of the range given
    * @param takes in the range allowed chosen by the user
    * @returns a random number
    */
    function randNum(range) {
        return Math.floor(Math.random() * range);
    }

    let arrRGB = [];
    let range = chooseRange(difficulty);
    const baseNumber = randNum(256);

    for (let i = 0; i < 3; i++) {
        if (range == 256) {
            arrRGB[i] = randNum(range);
        }
        else {
            arrRGB[i] = randNum(range) + baseNumber;
        }
    }

    return `rgb(${arrRGB[0]},${arrRGB[1]},${arrRGB[2]})`;
}

/**
* @function checkDominantColor
* Takes in a string composed of the 3 values of the rgb colors, compares which color
* is predominant using the checkBiggestNumber function. 
* @param a array composed of the 3 numbers from an rgb color
* @returns a string with the predominant color
*/
function checkDominantColor(rgb) {

    /* @function checkbiggestRGB
    * Compares which one of the 3 values is the biggest !
    * @param a array composed of the 3 numbers from an rgb color
    * @returns the biggest number of the array
    */
    function checkBiggestNumber(rgb) {
        let biggestNumber = 0;

        for (let i = 0; i < rgb.length; i++) {
            if (biggestNumber < rgb[i]) {
                biggestNumber = rgb[i];
            }
        }
        return biggestNumber;
    }

    let color;
    let biggestRGB = checkBiggestNumber(rgb);

    if (biggestRGB == rgb[0]) {
        color = "red";
    }
    else if (biggestRGB == rgb[1]) {
        color = "green";
    }
    else {
        color = "blue";
    }

    return color;
}

/**
* @function chooseRange
* Choose the range allowed for colors based on the difficulty level that the user choosed  
* @param nothing
* @returns the range
*/
function chooseRange(difficulty) {
    let range;

    //Get the difficulty from user input
    // const form = document.forms[0];
    // let difficulty = form.difficulty.valueAsNumber;

    if (difficulty == 0) {
        range = 256;
    }
    else if (difficulty == 1) {
        range = 80;
    }
    else if (difficulty == 2) {
        range = 40;
    }
    else {
        range = 10;
    }

    return range;
}

/** 
* @function compareColorsMatch function compares if the tile's predominant color is the same as the color that the user selected in the controls
* @param rgb(color of the tiles in rgb values) and color (the color choosen by the user in controls)
* @returns true if the color fo the tile matches the user's selected color otherwise returns false
* 
*/
function compareColorsMatch(rgb, colorUser) {
    let arrayRgb;
    let colorTile;

    arrayRgb = transformRGBintoArray(rgb);
    colorTile = checkDominantColor(arrayRgb);

    if (colorTile == colorUser) {
        return true;
    }
    return false;
}

/** 
* @function transformRGBintoArray
* This function will transform a rgb color into an array composed of the rgb 3 number values
* @param rgbValue(which represent the color of the tile in rgb value)
* @returns an array with the 3 values of the rgb color
*/
function transformRGBintoArray(rbgValue) {
    let finalArray = [];
    let rgbString = String(rbgValue);
    let tempArr = rgbString.split("(");
    let sliceCopy = tempArr.slice(1, 2);
    rgbString = String(sliceCopy);
    tempArr = rgbString.split(")");
    sliceCopy = tempArr.slice(0, 1);
    rgbString = String(sliceCopy);
    tempArr = rgbString.split(",");
    finalArray = tempArr.map(colors => parseInt(colors, 10));

    return finalArray;
}

/**
* Selects/unselects the tiles which the user clicked on by given them a red border or taking it off.
* @param {*} e event object that initiated the event handler.
*/
function toggleSelectedTableCell(e) {
    //Gets the closest table cell to where the use clicked inside the game board
    let tableCell = e.target.closest("td");
    //Exits the function if the user clicked in an area of the board that is not inside a tableCell
    if (tableCell === null) {
        return;
    }
    //Toggles the selection CSS on and off
    tableCell.classList.toggle("selected");
}

/**
 * Returns table cells that the user selected
 * @param {*} tableCells: an array of table cell elements
 * @returns an array of table cell elements
 */
function getSelectedTableCells(tableCells) {
    //Gets only the table cells that are selected
    let selectedTableCells = tableCells
        .filter(tableCell => tableCell.classList.contains("selected"));
    return selectedTableCells;
}

/**
 * Keyboard input handler that checks if the user initiated the "cheat mode" correctly
 * @param {*} e keydown event
 * @returns nothing
 */
function cheatModeHandler(e) {
    //Exits if the user didn't click "shift + C"
    if (!(e.shiftKey && e.key === 'C')) {
        return;
    }
    //Exist if the user clicked "shift + C" inside an input area CC
    if (e.target.tagName === "INPUT") {
        return;
    }
    toggleCheatMode();
}

/**
 * Toggles the cheat mode for the game on and off.
 */
function toggleCheatMode() {
    let gameboard_table = document.getElementById("gameboard_table");
    const tableCells = Array.from(gameboard_table.querySelectorAll("td"));

    //Removes cheat text if it was already there
    if (gameboard_table.classList.contains("cheat_mode")) {
        tableCells.forEach(tableCell => {
            tableCell.innerText = "";
        });
    }
    //Adds cheat text if it wasn't already there
    else {
        tableCells.forEach(tableCell => {
            let rgb = tableCell.style.backgroundColor;
            let rgbArr = transformRGBintoArray(rgb)
            let dominantColor = checkDominantColor(rgbArr)
            let rgbTextSpan = document.createElement("span");
            rgbTextSpan.innerText = `${rgb}\r${dominantColor}`;
            tableCell.appendChild(rgbTextSpan);
        });
    }
    gameboard_table.classList.toggle("cheat_mode");
}

/** @function displayPercentage
* This function changes the text message to display the pourcentage of right answers that the user got 
* based on the total number of tiles that exist with this predominant color.
* @param numTotalDom: the total number of table cells with the dominant color
* @param numCorrectSelected: the number of table cells that the user guessed correctly
* @returns a string representing the text message with the pourcentage of sucess or a failure message
*/
function displayPercentage(numTotalDom, numCorrectSelected){
    //Failure message
    if (numCorrectSelected == 0) {
        let message = "So sorry, but you got no answers right!";
        return message;
    }

    //Calculation of the right pourcentage
    let pourcent = Math.floor(numCorrectSelected / numTotalDom * 100);

    //Success message
    let message = "Congrats, you got " + pourcent + "% of questions right !";
    return message;
}

/**
* @function showGeneralCountMessage
* This function will display the general text which will contain the choosen color, the total number 
* of right-colored tiles and the number of tiles curently selected!
* @param colorUser (the color choosen by the user in controls), 
* @param numberOfTilesRightColor(is the total number of tiles that exist with this predominant color that the user choosed)
* @param selectedTiles( which is the total number of selected tiles in general no matter wrong or good they are)
* @returns a string containing the text message with the parameters
*/
function showGeneralCountMessage(colorUser, numberOfTilesRightColor, selectedTiles) {
    let text = "Searching for " + colorUser + " ! Your target is " + numberOfTilesRightColor + " ! " + selectedTiles + " selected tiles!";
    return text;
}

/**
 * Counts the number of tiles with the dominant color chosen by the user
 * @param {*} tiles an array of table cells 
 * @param {*} colorChoosenByUser represents the color chosen by the user in the setup phase (blue, red, green)
 * @returns the number of tiles with the dominant color
 */
function countNumDomTiles(tiles, colorChoosenByUser) {
    let numDomTiles = 0;
    for (let i = 0; i < tiles.length; i++) {
        let tileRGB = tiles[i].style.backgroundColor;
        console.log(colorChoosenByUser);
        if (compareColorsMatch(tileRGB, colorChoosenByUser)) {
            numDomTiles++;
        }
    }
    return numDomTiles;
}

/**
 * Handles the events that happen when the game is submitted
 */
function gameSubmitHandler() {
    let table = document.getElementById("gameboard_table")
    let tableCells = getTableCells(table);

    //Gets user input
    let colorChoosenByUser = document.getElementById("color").value;
    let difficulty = Number(document.getElementById("difficulty").value);
    let boardSize = document.getElementById("sizeBoard").value;

    //Gets data about tiles
    let selectedTableCells = getSelectedTableCells(tableCells);
    let numTotalDom = countNumDomTiles(tableCells, colorChoosenByUser);
    let numCorrectSelected = countNumDomTiles(selectedTableCells, colorChoosenByUser);

    //Creates a player object with player name and their score
    let player = {
        name: document.getElementById("playerName").value,
        score: calculateScore(numTotalDom, numCorrectSelected, boardSize, difficulty)
    }

    passNewPlayer(player);

    //Lets player re-enter setup information and turns off the game.
    setSetupFormStatus(true);
    disableGameboard(false);

    message.textContent = displayPercentage(numTotalDom, numCorrectSelected);
}

/**
 * Gives all the table cells inside a table
 * @param {} table - table element
 * @returns array of table cells
 */
function getTableCells(table) {
    let tableCells = Array.from(table.querySelectorAll("td"));

    return tableCells;
}

/**
 * Calculates the score of the player based on their choices and setup
 * @param {} numTotalDom the total number of cells with the dominant color chosen by the user
 * @param {*} numCorrectSelected the number of cells the user selected correctly
 * @param {*} boardSize the size of the board chosen by the user
 * @param {*} difficulty the difficulty of the game chosen by the user
 * @returns the score of the user
 */
function calculateScore(numTotalDom, numCorrectSelected, boardSize, difficulty) {   

    let percent = (numCorrectSelected / numTotalDom) * 100;
    let boardSizeMultiplier = (boardSize - 2) * 0.5;
    let difficultyMultiplier = (difficulty + 1) * 0.5;
    let score = Math.floor(percent * boardSizeMultiplier * difficultyMultiplier);

    return score;
}

/**
 * Disables all the functionalities inside the game to not let the user alter anything
 */
function disableGameboard() {
    let submitGuessesButton = document.getElementById("submit_guesses")
    submitGuessesButton.disabled = true;
    
    let board = document.getElementById("gameboard_table");
    board.replaceWith(board.cloneNode(true));
}
