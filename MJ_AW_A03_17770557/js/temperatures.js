"Use strict"

const getElement = (selector) => document.querySelector(selector);
// Helper Functions
const calculateToCelsius = temp => {
    const outputValue = (temp-32) * (5/9); //used to calculate from fahrenheit to celsius
    return outputValue;
}
const calculateToFahrenheit = temp => {
    const outputValue = (temp * (9/5)) + 32; //used to calculate from celsius to fahrenheit
    return outputValue;
}
const isValidEntry = (inputValue) =>{
    if(!isNaN(inputValue) && inputField.value != ""){
        return true;
    }
    else{
        return false;
    }
}
const clearInputs = () =>{
    inputField.value = "";
    outputField.value = "";
}
// Functions
const convertTemperature = () =>{
    if(isValidEntry(inputField.value)){
        const inputValue = parseInt(inputField.value);
        let outputValue; //This will be the converted value returned to the output field
        switch(conversionFlag.value){
            case "c":
                outputValue = calculateToCelsius(inputValue);
                break;
            case "f":
                outputValue = calculateToFahrenheit(inputValue);    
                break;
            default:
                break;
        }
        outputField.value = outputValue.toFixed(1);
        //Clear Error Message
        errorMessage.innerText = "";
    }
    else{
        //Error Message
        errorMessage.innerText = "[Please enter a number]";
        clearInputs();
        inputField.select();
        inputField.focus();
    }
    
}
const displayUnits = (isUsingFahrenheit) =>{
    let inputUnit = "";
    let outputUnit = "";
    if(isUsingFahrenheit == true){//f -> c
        inputUnit = "Fahrenheit";
        outputUnit = "Celsius";
        conversionFlag.value = "c"
    }
    else{ //c -> f
        inputUnit = "Celsius";
        outputUnit = "Fahrenheit";
        conversionFlag.value = "f"
    }
    clearInputs();
    inputField.select();
    inputField.focus();
    inputLabel.innerText = ("Enter " + inputUnit + ":");
    outputLabel.innerText = ("Degrees " + outputUnit + ":");
}
//Form Elements
const convertButton = getElement("#convert");
const errorMessage = getElement(".error-message")
//Radio Buttons
const fToCRadio = getElement("#f-c");
const cToFRadio = getElement("#c-f");
const conversionFlag = getElement("#out-unit") // Hidden Input that keeps track of what unit the output temp is
//Inputs
const inputField = getElement("#temp-input");
const outputField = getElement("#temp-output");

const inputLabel = getElement("#input-label");
const outputLabel = getElement("#output-label");


//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    convertButton.addEventListener("click", convertTemperature);

    fToCRadio.addEventListener("click", function() {
        displayUnits(true);
    });
    cToFRadio.addEventListener("click", function() {
        displayUnits(false);
    });
    inputField.select();
    inputField.focus();
});