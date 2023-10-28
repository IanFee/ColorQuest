'use strict';

 document.addEventListener("DOMContentLoaded", setup);

function setup(){
    
    
    //Get the form
    const form = document.forms[0];

    //Create the board
    form.addEventListener("submit", setTheBoard);
    
    //Function will begin the database

    function setTheBoard(event)
    {
    event.preventDefault();

    const sizeBoard = event.target.sizeBoard.value;
    const color = event.target.elements.color.value;

    createBoard(sizeBoard);

    }

    function generateRandomColor() {

        const r = randNum(0,256);
        let range = chooseRange();
        let min;
        let max;

        function randNum(min, max) 
        {
            return Math.floor(Math.random() *( (max - min) + min));
        }

        if(r<=range){
            min = 0;
            max = r+range;
        }
        else if(r>=(256-range))
        {
            min = r-range;
            max = 256;
        }
        else
        {
            min = r-range;
            max = r+range;
        }

        const g = randNum(min,max);
        const b = randNum(min,max);
       
        return `rgb(${r},${g},${b})`;

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


    function chooseRange()
    {
        
        let range;

        let difficulty = form.difficulty.value;

        if(difficulty==0)
        {
            range = 0;
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
            
    function createBoard(sizeBoard){

        //Get the section where the board is supposed to be created!
        const boardForm  = document.getElementById("gameboard");
        
        //Create the board + append it
        const board = document.createElement('table');
        board.setAttribute("id","board");
       
        const button = document.getElementById('colors');

        boardForm.insertBefore(board,button);

        for(let i=0; i<sizeBoard; i++)
        {
          //Create the trs
          let rows = document.createElement('tr');
          board.appendChild(rows);
      
            for(let k=0;k<sizeBoard;k++)
              {   
                //Create the tds
                let columns = document.createElement('td');
                rows.appendChild(columns);
                columns.style.backgroundColor = generateRandomColor();

              }
        }
    
    }
    // function checkCompatibilecolors(userColor){
//     const tds = document.querySelectorAll('#board td');

//     tds.forEach(td => {
//         const colorRGB = td.style.backgroundColor;
//         const colorString = checkDominantColor(generateRGBArray);

//         if(userColor = )
//     });
// }

// New messages
}







