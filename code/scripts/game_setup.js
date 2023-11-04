"use strict"

document.addEventListener('DOMContentLoaded', function(e) {
      //Event handlers for the game setup
      const setupForm = document.getElementById("setup_form");
      setupForm.addEventListener('submit', gameSetupHandler);

      //Alerts the user if a specific input is invalid before trying to submit
      setupForm.addEventListener('change', styleInvalidInput);
      setupForm.addEventListener("focusout", styleInvalidInput);

      //Alerts the user to which inputs are invalid if there are any when they try to submit
      const startButton = document.getElementById("game_setup_submit");
      startButton.addEventListener("click", function(){
            styleInvalidForm(setupForm);
      })
      
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
      setGameboardStatus(true);

      //Gets all user input values and uses them to create the board
      let sizeBoard = document.getElementById('sizeBoard').value;
      let color = e.target.elements.color.value;
      let difficulty = e.target.elements.difficulty.valueAsNumber;

      createGameBoard(sizeBoard, color, difficulty);
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
 * Sytles a single input box using css to show user that their data is invalid. Has no effect if the input is valid.
 * @param {*} e event object that initiated the event handler. Has to be one of the various form elements used to get user data.
 */
function styleInvalidInput(e){
      e.target.closest("fieldset").classList.add('invalid_input');
}

/**
 * Styles all input boxes in a form to show the user which of their data is invalid. Has on effect id all user data is valid.
 * @param {*} e event object that initiated the event handler. Has to be a form element
 */
function styleInvalidForm(e){
      if(e.tagName != 'FORM'){
            throw new Error("Incorrect Usage: Function styleInvalidForm only accepts form elements.");
      }
      Array.from(e.elements)
            .forEach(element => element.closest("fieldset").classList.add("invalid_input"));
}

/**
 * Modified the start button's color to fit the one chosen by the user 
 */
function changeStartButtonColor(e){
      const startButton = document.getElementById("game_setup_submit");
      startButton.style.backgroundColor = e.target.value;
}
