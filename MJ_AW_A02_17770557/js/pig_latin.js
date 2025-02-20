"use strict"
const getElement = (selector) => document.querySelector(selector);

//Helper Functions
const getInput = () =>{
    return inputField.value;
};
const displayOutput = (outputValue) =>{
    outputField.value = outputValue;
};

const cleanEntry = (text) =>{
    //RegEx to globally remove everything 
    // that is not a space or a-z ignore case
    let pattern = /[^a-z,/\s]/gi;
 
    return text.replaceAll(pattern, "");
};
const isVowel = (input) =>{
    let vowels = ["a", "e", "i", "o", "u"];
    let isVowel = false;
    vowels.forEach(vowel => {
        if(input === vowel){
            isVowel = true;
        } 
    });
    return isVowel;
};
//Functions

const processEntry = () =>{
    let inputValue = getInput();
    inputValue = cleanEntry(inputValue);
    translateWord(inputValue);
    inputField.select();
    inputField.focus();
};

const translateWord = (input) =>{
    /*replace line breaks with "@"
    Because the input is a textarea, the input can include line breaks, and by replacing them with " @ ", we can preseerve the formatting for line breaks in the output
    */
    input = input.replaceAll("\n", " @ ");
    let inputWords = input.split(" ");
    // initialize loop variables
    let currentWord;
    let outputValue = "";
    inputWords.forEach(element => {
        if(isVowel(element[0])){//If the word starts with a vowel, add "way" to the end of the word
            currentWord = element + "way ";
        }
        else if(element === "@"){//replace "@" with line breaks
            currentWord = "\n";
        }
        else if (element.length == 1){ //catches any words with only one character. Since this is after the checks for first letter vowels and line breaks, this will only affect words that only include one consonant. As no such words exist, this will preserve single character entries.
            currentWord = element;
        }
        else if(isVowel(element[0]) == false && isVowel(element[1])){//If the word starts with a consonant then a vowel, move the first constanent to the end of the word and add "way" to the end
            currentWord = element;
            const lastIndex = currentWord.length;
            currentWord = currentWord.slice(1, lastIndex) + element[0] + "ay ";
        }
        else if(isVowel(element[0]) == false && isVowel(element[1]) == false){//If the word starts with two consonants, move the first two constanents to the end of the word and add "way" to the end
            currentWord = element;
            const lastIndex = currentWord.length;
            currentWord = currentWord.slice(2, lastIndex) + element[0] + element[1] + "ay ";
        }

        if(element != ""){
            outputValue += currentWord; //concatante 
        }
    });
    displayOutput(outputValue);
}

const clearForm = () =>{
    inputField.value = "";
    outputField.value = "";
};

//Form Elements
const inputField = getElement("#input");
const outputField = getElement("#output");

const translateButton = getElement("#translate");
const clearButton = getElement("#clear");


//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    translateButton.addEventListener("click", processEntry)
    clearButton.addEventListener("click", clearForm);
    inputField.select();
    inputField.focus();
});