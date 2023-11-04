"use strict"

//Global Variables
const topPlayers = [];

document.addEventListener('DOMContentLoaded', function(){
      //Table sorting button handler
      const sortChanger = document.getElementById("sort_changer");
      sortChanger.addEventListener("click", function(){
            toggleNumericalOrdering();
            displayCurrentScores();
      });

      //Delete scores button handler
      const deleteScoresButton = document.getElementById("delete_scores_button");
      deleteScoresButton.addEventListener("click", emptyHighscores);

      loadHighscoresData();
});

/**
 * Adds a the new player to the list of top players and removes excess players from the top 10.
 * @param {*} newPlayer player object containing the player's name and score.
 */
function passNewPlayer(newPlayer){
      //TODO: check type of object

      //Adds the new player to the list of top players then in case of more than 10 top players, the excess players are removed
      topPlayers.push(newPlayer);
      topPlayers.sort((a,b) => b.score - a.score);
       
      //removes excess players: players who are not in the top 10
      while(topPlayers.length > 10){
            topPlayers.pop();
      }

      displayCurrentScores(false);
       
      updateLocalStorage();
}

/**
 * Updates the local storage with the new highscores
 */
function updateLocalStorage(){
      let highScoresJSON = JSON.stringify(topPlayers);
      localStorage.setItem("highscores", highScoresJSON);
}

/**
 * Applies a class to the table that implies that the list should be displayed in reverse order
 */
function toggleNumericalOrdering(){
      const highScoresTable = document.getElementById("highscores_table");
      highScoresTable.classList.toggle("reverse_numerical_order");
}

/**
 * Displays the current scores to the web user on the highscores table
 */
function displayCurrentScores(){
      const highScoresTable = document.getElementById("highscores_table");
      const highScoresTableBody = highScoresTable.querySelector("tbody");

      //Creates an array that is ordered in the way the user requested based on wether it has the class indicating reverse ordering
      let scoresToDisplay;
      if(highScoresTable.classList.contains("reverse_numerical_order")){
            scoresToDisplay = topPlayers.toSorted((a,b) => a.score - b.score);
      }
      else{
            scoresToDisplay = topPlayers.toSorted((a,b) => b.score - a.score);
      }
      
      //Empties the previous highscore table
      highScoresTableBody.textContent = "";

      updateHighscoreTable(scoresToDisplay);
}

/**
 * Creates a new highscore table with the updated values and ordering and displays it
 * @param {*} scoresToDisplay the list of scores to insert into the table. It's values are inserted in the same order given
 */
function updateHighscoreTable(scoresToDisplay){
      const highScoresTable = document.getElementById("highscores_table");
      const highScoresTableBody = highScoresTable.querySelector("tbody");

      for(let i = 0; i < scoresToDisplay.length; i++){
            let newTableRow = document.createElement("tr");
            let playerNameCell = document.createElement("td");
            let playerScoreCell = document.createElement("td");

            playerNameCell.textContent = scoresToDisplay[i].name;
            playerNameCell.colSpan = 2;
            playerNameCell.classList.add("name");

            playerScoreCell.textContent = scoresToDisplay[i].score;
            playerScoreCell.classList.add("score");

            newTableRow.appendChild(playerNameCell);
            newTableRow.appendChild(playerScoreCell);

            highScoresTableBody.appendChild(newTableRow);
      }
}

/**
 * Loads the previous top players from the browser's web storage and into the relevant data structures and the web page.
 * @returns nothing
 */
function loadHighscoresData(){
      //Exits the function if highscores doesn't exist in the local storage or if it has no value.
      if(localStorage.getItem("highscores") == undefined){
            return;
      }

      //Retrieves and decodes data from local storage.
      let highScoresJSON = localStorage.getItem("highscores");
      let highscoresData = JSON.parse(highScoresJSON);

      //Exists the function if the local storage didn't store any object from the previous sessions.
      if(highscoresData.length == 0){
            return;
      }

      //Adds the object found in the local storage to the top players.
      highscoresData.forEach(player => passNewPlayer(player));
}

/**
 * Removes the previously stores high scores from everywhere.
 */
function emptyHighscores(){
      //Removes all previous scores from the internal data structure
      topPlayers.length = 0;
      //Removes data of top players from the browser's memory
      localStorage.removeItem("highscores");

      const highScoresTable = document.getElementById("highscores_table");
      const highScoresTableBody = highScoresTable.querySelector("tbody");

      //Empties the table in the webpage
      highScoresTableBody.textContent = "";
}