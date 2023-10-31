'use strict';

 document.addEventListener("DOMContentLoaded", function(e){
    
    //Get the form
    const boardForm  = document.getElementById("gameboard");
    const board = document.createElement('table');
    const form = document.forms[0];

    //Create the board
    form.addEventListener("submit", setTheBoard);
    board.addEventListener("click", checkSelected);
    
    //Function will begin the database

    function setTheBoard(event)
    {
    event.preventDefault();

    const sizeBoard = event.target.sizeBoard.value;
    const color = event.target.elements.color.value;

    createBoard(sizeBoard);

    }

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


    function chooseRange()
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
            
    function createBoard(sizeBoard){

        //Get the section where the board is supposed to be created!
        
        //Create the board + append it
        
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

    function checkSelected(event){

    const bgColor = event.target.style.backgroundColor;
    event.target.classList.toggle("selected");
    event.target.textContent=bgColor;
       
    }



});







        // let range = chooseRange();
        // let min;
        // let max;

        // function randNum(min, max) 
        // {
        //     return Math.floor(Math.random() * (max - min) + min);
        // }
        // if(range=256){
        //     min=0;
        //     max=256;
        // }
        // else if(r<=range){
        //     min = 0;
        //     max = r+range;
        // }
        // else if(r>=(256-range))
        // {
        //     min = r-range;
        //     max = 256;
        // }
        // else
        // {
        //     min = r-range;
        //     max = r+range;
        // }

        // const g = randNum(min,max);

        // if(range=256){
        //     min=0;
        //     max=256;
        // }
        // else if(g<=range){
        //     min = 0;
        //     max = g+range;
        // }
        // else if(g>=(256-range))
        // {
        //     min = g-range;
        //     max = 256;
        // }
        // else
        // {
        //     min = g-range;
        //     max = r+range;
        // }

        // const b = randNum(min,max);