'use strict';

function generateRandomColor() {

        function randNum(range) 
        {
            return Math.floor(Math.random() * (range) );
        }

        const arr = [];
        let range = chooseRange();
        const baseNumber = randNum(256); 

      
        for(let i=0; i<3; i++)
        {   
            if(!(range==256))
            {
                arr[i] = randNum(range)+baseNumber;
            }
            else{
                arr[i] = randNum(range);   
            }
        }
           
       
        return `rgb(${arr[0]},${arr[1]},${arr[2]})`;

      }
// function checkDominantColor(rgb){

//     function checkBiggestRGB(rgb)
//     {

//         let biggestNumber = 0;

//         for(let i=0; i<rgb.length; i++)
//             {
//                 if(biggestNumber<rgb[i])
//                 {
//                     biggestNumber = rgb[i];
//                 }
//             }
//     }

// let color = "";
// const biggestRGB = checkBiggestRGB(rgb);

// if(biggestRGB=rgb[1]){
//     color = "red";
// }
// else if(biggestRGB=rgb[2]){
//     color="green";
// }
// else{
//     color="blue";
// }

// return color;

// }


function chooseRange(){
    let range;
    const form = document.forms[0];
    let difficulty = form.difficulty.value;

    if(difficulty==0)
    {
        
        let range;

        let difficulty = form.difficulty.value;

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

    return range;
}
        
function createBoard(sizeBoard){

    //Get the section where the board is supposed to be created!
    
    //Create the board + append it

    const boardForm  = document.getElementById("gameboard");
    let board = document.createElement('table');
    board.addEventListener("click", checkSelected);
    
    board.setAttribute("id","board");
    
    const button = document.getElementById('colors');

    boardForm.insertBefore(board,button);

    for(let i=0; i<sizeBoard; i++)
    {
        //Create the trs
        let rows = document.createElement('tr');
        board.appendChild(rows);
    
        for(let k=0;k<sizeBoard;k++){   
            //Create the tds
            let columns = document.createElement('td');
            rows.appendChild(columns);
            columns.style.backgroundColor = generateRandomColor();
        }
    }
}

function checkSelected(event){
    const bgColor = event.target.style.backgroundColor;
    event.target.classList.toggle("selected");
    //event.target.textContent=bgColor;
}

document.addEventListener('DOMContentLoaded', function(){
    const gameSubmitButton = document.getElementById("colors");
    gameSubmitButton.addEventListener('click', gameSubmitHandler);
});

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

    const gameSubmitButton = document.getElementById("colors");
    gameSubmitButton.disabled = status;
}