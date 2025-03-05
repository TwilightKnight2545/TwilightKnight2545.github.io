"Use strict"

const getElement = (selector) => document.querySelector(selector);
// Global Variables
// A two dimensional array is simpler than parallel arrays, and is less prone to breaking. In other words, it reduces complexity
let testScores = [["Ben", 88], ["Joel", 98], ["Judy", 77], ["Anne", 88]]; // [0 = name, 1 = score]

// Helper Functions
const validateScoreInput = (scoreInput) =>{
    let isValid = false;
    if (!isNaN(scoreInput) && scoreInput >= 0 && scoreInput <= 100){
        isValid = true;
    }
    return isValid;
}
const clearInputs = () =>{
    fieldInputName.value = "";
    fieldInputScore.value = "";
    labelErrorMessage.innerText = "";
}
const createElementWithText = (tagName, text) =>{
    const element = document.createElement(tagName);
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
    return element;
}
const setFocus = (target) =>{
    target.select();
    target.focus();
}
const findHighest = (array) =>{
    let highestScore = 0;
    let highestScoreIndex = 0;
    for (i = 0; i < array.length; i++){
        if(array[i][1] > highestScore){
            highestScore = array[i][1];
            highestScoreIndex = i;
        }
    }
    return testScores[highestScoreIndex]; // returns the score and name of the highest number
}
const findAverage = (array) =>{
    let totalScore = 0;

    for (i = 0; i < array.length; i++){
        totalScore += array[i][1];
    }
    return (Math.round(totalScore/array.length))
}
// Functions
const addToArray = () =>{
    const inputName = fieldInputName.value;
    const inputScore = parseInt(fieldInputScore.value); //if not a number, it will become 'NaN' and will get caught by the validateScoreInput function

    if (inputName != ""){
        if (validateScoreInput(inputScore)){
            testScores.push([inputName, inputScore]);
            clearInputs();
            setFocus(fieldInputName);
        }
        else{
            labelErrorMessage.innerText = "Please enter a whole number between 0-100";
            fieldInputScore.value = "";
            setFocus(fieldInputScore);
        }
    }
    else{
        labelErrorMessage.innerText = "Please enter a name"
        fieldInputName.value = "";
        setFocus(fieldInputName);
    }
    
}
const removeLastEntry = () =>{
    testScores.pop();
}
const displayResults = () =>{
    //Make the fieldset visible
    fieldset.removeAttribute("class");
    //Get Values
    const highestScore = findHighest(testScores); //returns an array: [name, score]
    const avgScore = findAverage(testScores);     //returns an int
    //Clear existing display
    divResults.replaceChildren();
    //Display Header
    divResults.append(createElementWithText("h3", "Results"));
    //Display Avg. and High Score
    divResults.append(createElementWithText("p", ("Average Score: " + avgScore)));
    divResults.append(createElementWithText("p", ("High Score: " + highestScore[0] + " with a score of " + highestScore[1])));
    //Update Button Name
    buttonDisplayResults.innerText = "Refresh Results";
}
const displayScores = () =>{
    //Display Scores
    let scoreDiv;
    let nameP;
    let scoreP;
    //Make the fieldset visible
    fieldset.removeAttribute("class");
    //Clear existing display
    divScores.replaceChildren();
    //Display Header
    divScores.append(createElementWithText("h3", "Scores"));
    //Display Scores
    for (i = 0; i < testScores.length; i++){
        scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("class", "score");
    
        nameP = createElementWithText("p", testScores[i][0]);
        nameP.setAttribute("class", "score-name");

        scoreP = createElementWithText("p", testScores[i][1]);
        scoreP.setAttribute("class", "score-value");
    
        scoreDiv.appendChild(nameP);
        scoreDiv.appendChild(scoreP);
        divScores.append(scoreDiv);
    }
    //Update Button Name
    buttonDisplayScores.innerText = "Refresh Scores";
    
}
//Form Elements
//Buttons
const buttonAddToArray = getElement("#add-to-array");
const buttonRemoveLastEntry = getElement("#remove-last-entry");
const buttonDisplayResults = getElement("#display-results");
const buttonDisplayScores = getElement("#display-scores");


//Fields
const fieldInputName = getElement("#name-field");
const fieldInputScore = getElement("#score-field");

//Label
const labelErrorMessage = getElement(".error-message");
//Displays
const divResults = getElement("#results");
const divScores = getElement("#scores");
const fieldset = getElement(".invisible");
//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    buttonAddToArray.addEventListener("click", addToArray);
    buttonRemoveLastEntry.addEventListener("click", removeLastEntry);
    buttonDisplayResults.addEventListener("click", displayResults);
    buttonDisplayScores.addEventListener("click", displayScores);
    setFocus(fieldInputName);
});