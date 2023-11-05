'use strict';
/* @function generateRandomColor
* Uses ranNum function to generate a random number, all depnding on the range allowed
* and sets those values into a rgb color.
* @param nothing
* @returns a color in rgb values!
*/
function generateRandomColor(difficulty){
        /* @function randNum
        * Generates a random number starting from the value of the range given
        * @param takes in the range allowed chosen by the user
        * @returns a random number
        */
    function randNum(range) 
        {
            return Math.floor(Math.random() * range );
        }

    let arrRGB       = [];
    let range        = chooseRange(difficulty);
    const baseNumber = randNum(256); 

        for(let i=0; i<3; i++)
        {   
            if(range==256)
            {
                arrRGB[i] = randNum(range);
            }
            else
            {
                arrRGB[i] = randNum(range)+baseNumber;
            }
        }
           
    return `rgb(${arrRGB[0]},${arrRGB[1]},${arrRGB[2]})`;

}

/* @function checkDominantColor
* Takes in a string composed of the 3 values of the rgb colors, compares which color
* is predominant using the checkBiggestNumber function. 
* @param a array composed of the 3 numbers from an rgb color
* @returns a string with the predominant color
*/
function checkDominantColor(rgb){

    /* @function checkbiggestRGB
    * Compares which one of the 3 values is the biggest !
    * @param a array composed of the 3 numbers from an rgb color
    * @returns the biggest number of the array
    */
    function checkBiggestNumber(rgb)
    {
        let biggestNumber = 0;

        for(let i=0; i<rgb.length; i++)
            {
                if(biggestNumber<rgb[i])
                {
                    biggestNumber = rgb[i];
                }
            }
        return biggestNumber;
    }


let color ;
let biggestRGB = checkBiggestNumber(rgb);

if(biggestRGB==rgb[0]){
    color = "red";
}
else if(biggestRGB==rgb[1]){
    color="green";
}
else{
    color="blue";
}

return color;
}

/* @function chooseRange
* Choose the range allowed for colors based on the difficulty level that the user choosed  
* @param nothing
* @returns the range
*/
function chooseRange(difficulty){
    let range;

    //Get the difficulty from user input
    // const form = document.forms[0];
    // let difficulty = form.difficulty.valueAsNumber;

        if(difficulty==0)
        {
            range = 256;
        }
        else if(difficulty==1)
        {
            range = 80;
        }
        else if(difficulty==2)
        {
            range = 40;
        }
        else
        {
            range = 10;
        }

    return range;
}

/* @function createBoard
* This function generates a table with rows and columns based on user input, in addition with a <p> elemnt and a button 
* @param sizeBoard(size of the board), difficulty(the difficulty number) and colorChoosenByUser(the color that the user selected)
* @returns nothing
*/
let submitGuessesButton;

function createGameBoard(sizeBoard,colorChoosenByUser,difficulty){

  let columns;
  let rows;
  let match = false;
  let countNumberMatches = 0;
  let numberOfSelectedTiles = 0;   
  let colorTile;
  let allTds;
  let lengthOfTds;

    //Get the section where the board is supposed to be created!
    const boardForm  = document.getElementById("gameboard");

    //Create the board + append it
    const board = document.createElement('table');
    board.setAttribute("id", "gameboard_table");
    boardForm.appendChild(board);

    //Create text message + append it
    const message = document.createElement('p');
    boardForm.appendChild(message);
    
    //Create submit guessesbutton +append it
    submitGuessesButton = document.createElement('button');
    boardForm.appendChild(submitGuessesButton);
    submitGuessesButton.textContent = "Submit Your Guesses !";

        
    //Creates the trs and tds + counts number of matches
    for(let i=0; i<sizeBoard; i++)
    {
        //Create the trs
        rows = document.createElement('tr');
        board.appendChild(rows);
    
        for(let k=0;k<sizeBoard;k++){   

            //Create the tds
            columns = document.createElement('td');
            rows.appendChild(columns);

            //Gives an RGB color to a td
            columns.style.backgroundColor = generateRandomColor(difficulty);

            //Check if tile color matches the user selcted color(if true match++)
            colorTile = columns.style.backgroundColor;

            match = compareColorsMatch(colorTile,colorChoosenByUser);
            if(match)
            {
                countNumberMatches++;
            }
            
        
        }
    }
    
    /*Adds a text message inside the <p> element that shows how many tiles are
    * matching the right color and how many are selected !*/
    message.textContent = showGeneralCountMessage( colorChoosenByUser, countNumberMatches,0);
    message.style.color = "brown";
   
    //Event handler for the tiles!
    board.addEventListener("click", function(event){
        //Counts number of selected tiles
        toggleSelectedTableCell(event);
        numberOfSelectedTiles = countSelectedTableCells(event);
        
        //Updates the selcted tiles text message
        message.textContent = showGeneralCountMessage( colorChoosenByUser,countNumberMatches, numberOfSelectedTiles);
        

        //Disaibling/Enaibling the submitGuesses button when the user goes over the total num of tiles that match the user selected color
        allTds = document.querySelectorAll("td.selected");
        lengthOfTds = allTds.length;

        if( lengthOfTds > countNumberMatches){
            submitGuessesButton.disabled = true;
        }
        if( lengthOfTds == countNumberMatches){
            submitGuessesButton.disabled = false;
        }
     });
     
    //Event handler 
     submitGuessesButton.addEventListener("click", function(event)
     {
        //Changes the message content to the pourcentage of right answers
        message.textContent = displayPourcentage(allTds,lengthOfTds,countNumberMatches,colorChoosenByUser);
    });

    //document.addEventListener('DOMContentLoaded', function(){
        submitGuessesButton.addEventListener('click', gameSubmitHandler);
    //});

    //Event handler to check when user initiates cheat mode using their keyboard
    document.addEventListener('keydown', cheatModeHandler);
}

/**
 * Keyboard input handler that checks if the user initiated the "cheat mode" correctly
 * @param {*} e keydown event
 * @returns nothing
 */
function cheatModeHandler(e){
    //Exits if the user didn't click "shift + C"
    if(!(e.shiftKey && e.key === 'C')){
        return;
    }
    //Exist if the user clicked "shift + C" inside an input area CC
    if(e.target.tagName === "INPUT"){
        return;
    }
    toggleCheatMode();
}

/**
 * Toggles the cheat mode for the game on and off.
 */
function toggleCheatMode(){
    let gameboard_table = document.getElementById("gameboard_table");
    const tableCells = Array.from(gameboard_table.querySelectorAll("td"));

    //Removes cheat text if it was already there
    if(gameboard_table.classList.contains("cheat_mode")){
        tableCells.forEach(tableCell => {
            tableCell.innerText = "";
        });
    }
    //Adds cheat text if it wasn't already there
    else{
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

/* @function compareColorsMatch
* This function compares if the tile's predominant color is the same as the color that the user selected in the controls
* @param rgb(color of the tiles in rgb values) and color (the color choosen by the user in controls)
* @returns true if the color fo the tile matches the user's selected color otherwise returns false
*/

function compareColorsMatch(rgb,colorUser){  
    let arrayRgb;
    let colorTile;
            
    arrayRgb = transformRGBintoArray(rgb); 
    colorTile  = checkDominantColor(arrayRgb);

        if(colorTile == colorUser )
            {
                return true;
            }
    return false;
}

/**
* Selects/unselects the tiles which the user clicked on by given them a red border or taking it off.
* @param {*} e event object that initiated the event handler.
*/
function toggleSelectedTableCell(e){
    //Gets the closest table cell to where the use clicked inside the game board
    let tableCell = e.target.closest("td");
    //Toggles the selection CSS on and off
    tableCell.classList.toggle("selected");
}

function countSelectedTableCells(e){
    let numSelected = 0;

    //Gets all table cells inside the gameboard
    const tableCells = Array.from(e.currentTarget.querySelectorAll("td"));
    //Gets only the table cells that are selected
    let selectedTableCells = tableCells
                    .filter(tableCell => tableCell.classList.contains("selected"));
    //Gets number of selected table cells
    numSelected = selectedTableCells.length;

    return numSelected;
}

/* @function displayPourcentage
* This function changes the text message to display the pourcentage of right answers that the user got 
* based on the total number of tiles that exist with this predominant color.
* @param columns(which are a collection of tds), length(which is the number of tds in total),
* numberOfTilesRightColor(is the total number of tiles that exist with this predominant color that the user choosed),
* and colorUser is the color choosen by the user in the controls)
* @returns a string representing the text message with the pourcentage of sucess or a failure message
*/
function displayPourcentage(columns,length,numberOfTilesRightColor, colorUser){
    
    let numRightSelectedTiles = 0;
    let rgbColor ;
    let checkColor ;

    
    for(let i= 0; i< length; i++){

        rgbColor = columns[i].style.backgroundColor;

        //Checks if the tile color and the user color match !
        checkColor = compareColorsMatch(rgbColor,colorUser);
    
         if(checkColor)
         {
            numRightSelectedTiles++;
         }
    } 

    //Failure message
    if(numRightSelectedTiles==0)
    {
        let message = "So sorry, but you got no answers right!";
        return message;
    }
    
    //Calculation of the right pourcentage
    let pourcent = Math.floor(numRightSelectedTiles/numberOfTilesRightColor*100);
    
    //Sucess message
    let message = "Congrats, you got "+pourcent+"% of questions right !";
    return message;

}

/* @function showGeneralCountMessage
* This function will display the general text which will contain the choosen color, the total number 
* of right-colored tiles and the number of tiles curently selected!
* @param colorUser (the color choosen by the user in controls), 
* numberOfTilesRightColor(is the total number of tiles that exist with this predominant color that the user choosed)
* and selectedTiles( which is the total number of selected tiles in general no matter wrong or good they are)
* @returns a string containing the text message with the parameters
*/
function showGeneralCountMessage(colorUser, numberOfTilesRightColor,selectedTiles)
{
 let text = "Searching for "+colorUser+" ! Your target is "+numberOfTilesRightColor+" ! "+ selectedTiles+ " selected tiles!"; 
 return text;
}

/* @function transformRGBintoArray
* This function will transform a rgb color into an array composed of the rgb 3 number values
* @param rgbValue(which represent the color of the tile in rgb value)
* @returns an array with the 3 values of the rgb color
*/
function transformRGBintoArray(rbgValue)
{   
    let finalArray  = [];
    let rgbString   = String(rbgValue);
    let tempArr     = rgbString.split("(");
    let sliceCopy   = tempArr.slice(1,2);
    rgbString       = String(sliceCopy);
    tempArr         = rgbString.split(")");
    sliceCopy       = tempArr.slice(0,1);
    rgbString       = String(sliceCopy);
    tempArr         = rgbString.split(",");
    finalArray      = tempArr.map(colors => parseInt(colors,10));

    return finalArray;
}





function gameSubmitHandler(e){
    let player = {
        name: document.getElementById("playerName").value,
        score: calculateScore()
    }
    passNewPlayer(player);

    setSetupFormStatus(true);
    setGameboardStatus(false);
}

function calculateScore(){
    //not yet implemented
    return Math.floor(Math.random(100) * 100);
}

function setGameboardStatus(status){
    //Check for incorrect input values
    if(status !== true && status !== false){
        throw new Error("Incorrect Usage: Function disableSetupForm accepts 'true' and 'false' values only." )
    }
  
    //Changes true to false and false to true so that using the function is more intuitive
    status = !status;
    if(submitGuessesButton){
    submitGuessesButton.disabled = status;
    }
}
