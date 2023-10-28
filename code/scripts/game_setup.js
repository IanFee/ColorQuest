"use strict"

!(function() {
      document.addEventListener('DOMContentLoaded', function(e) {
            const setupForm = document.getElementById("setup_form");
            setupForm.addEventListener('submit', gameSetupHandler);
      })
      
      /**
       * Runs the code that finalizes the setup process and that starts the game.
       * @param {*} e event object that initiated the event handler
       */
      function gameSetupHandler(e){
            e.preventDefault();
            
            setSetupFormStatus(false);

            //TODO: Gets all user input values
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
}());