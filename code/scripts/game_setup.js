"use strict"

!(function() {
      document.addEventListener('DOMContentLoaded', function(e) {
            //Event handlers for the game setup
            const setupForm = document.getElementById("setup_form");
            setupForm.addEventListener('submit', gameSetupHandler);
            setupForm.addEventListener('change', styleInvalidInput)
            
            //Event handlers for for changing start game button's color
            const colorSelectField = document.getElementById("color");
            colorSelectField.addEventListener('change', changeStartButtonColor);
      })
      
      /**
       * Runs the code that finalizes the setup process and that starts the game.
       * @param {*} e event object that initiated the event handler. Usually a form element.
       */
      function gameSetupHandler(e){
            e.preventDefault();
            
            setSetupFormStatus(false);

            //TODO: Gets all user input values
            let sizeBoard = document.getElementById('sizeBoard').value;
            let color = e.target.elements.color.value;
            createBoard(sizeBoard);
        
            //TODO: Call function creatTable
      }

       /**
       * Turns the setup area of the game off and on.
       * @param {*} status values: ('true', 'false'). Define wether to turn the setup area of the  game off or on
       */
       function setSetupFormStatus(status){
            //Check for incorrect input values
            if(status !== true && status !== false){
                  throw new Error("Incorrect Usage: Function disableSetupForm accept 'true' and 'false' values only." )
            }

            //Changes true to false and false to true so that using the function is more intuitive
            status = !status;

            //Set every element inside the form to be disabled
            let formElements = Array.from(document.querySelector("#setup_form").elements);
            formElements.forEach(input => input.disabled = status);
      }

      /**
       * Sytles input boxes using css to show user that their data is invalid
       * @param {*} e event object that initiated the event handler. Usually a form element.
       */
      function styleInvalidInput(e){
            e.target.classList.add('invalid_input');
      }

      /**
       * Modified the start button's color to fit the one chosen by the user 
       */
      function changeStartButtonColor(e){
            const startButton = document.getElementById("game_setup_submit");
            startButton.style.backgroundColor = e.target.value;
      }
}());