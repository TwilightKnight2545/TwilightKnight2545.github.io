"use strict"
const getElement = (selector) => document.querySelector(selector);
// Helper Functions
const clearSpan = (element) => {
    element.innerText = "";
    element.setAttribute("class", "");
}
const normalizeDate = (date) =>{
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
return date;
}
// -- Get Radio Selections
const getSelectedRadio = (inputElementName = "") =>{
    const input = getElement("[name=" + inputElementName + "]:checked");
    return input;
}
// Functions
const processEntry = (event) =>{
    //Validates data
    validateEntry(inputDate.value, "date");
    validateEntry(inputNights.value, "nights");

    validateEntry(inputName.value, "name");
    validateEntry(inputEmail.value, "email");
    validateEntry(inputPhone.value, "phone");
        
    if(messageDate.innerText || messageNights.innerText || messageName.innerText || messageEmail.innerText || messagePhone.innerText){
        event.preventDefault();
        return; //prevents the form from submitting if there are any invalid entries
    }

    setSessionData();
}
const setSessionData = ()=> {
    sessionStorage.arrivalDate = normalizeDate(new Date(inputDate.value));
    sessionStorage.nights = inputNights.value;
    sessionStorage.adults = inputAdults.value;
    sessionStorage.children = inputChildren.value;
    sessionStorage.isEarlyCheckIn = checkEarlyCheckIn.value;

    sessionStorage.roomType = getSelectedRadio("room-type").id;
    sessionStorage.bedType = getSelectedRadio("bed-type").id;

    sessionStorage.name = inputName.value;
    sessionStorage.email = inputEmail.value;
    sessionStorage.phone = inputPhone.value.replaceAll(/(-)|(\()|(\)|\s)/g, "") //Removes '-' '(' ')' and whitespaces
}
const validateEntry = (text, name) =>{ //Accepts the value of an element and the error name for if the element is not valid
    
    const dateError = Error("Please enter a valid Date");
    const nightsError = Error("Please enter a number greater than zero");
    
    const nameError = Error("Please enter your Name");
    const emailError = Error("Please enter a valid Email");
    const phoneError = Error("Please enter a valid phone number");
    try {
        if(!text){//if the text is an empty string
            switch(name){
                case "date":
                    throw dateError;
                case "nights":
                    throw nightsError;
                case "name":
                    throw nameError;
                case "email":
                    throw emailError;
                case "phone":
                    throw phoneError;
            }
        }
        else{//Validates the data
            switch(name){
                case "date":
                    clearSpan(messageDate);
                    break;
                case "nights":
                    text = Math.ceil(parseFloat(text)); //Rounds up to nearest integer
                    inputNights.value = text;
                    if(parseInt(text) > 0){
                        clearSpan(messageNights);
                        break;
                    }
                    else{
                        throw nightsError;
                    }
                
                case "name":
                    clearSpan(messageName);
                    break;
                case "email":
                    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
                    if(emailPattern.test(text)){
                        clearSpan(messageEmail);
                        break;
                    }
                    else{
                        throw emailError;
                    }
                case "phone":
                    //Validates for 10 digit numbers, can include
                    text = text.replaceAll(/(-)|(\()|(\)|\s)/g, "");
                    //Removes '-' '(' ')' and whitespaces, which are acceptable characters for a phone number format
                    //This also helps with autofills!
                    if(!(/\D/).test(text) && text.length == 10){ //
                        //Displays the number in (xxx)xxx-xxxx format
                        inputPhone.value = text.substring(0,3) + "-" + text.substring(3,6) + "-" + text.substring(6);
                        clearSpan(messagePhone);
                        break;
                    }
                    else{
                        throw phoneError;
                    }
            }
        }
    } catch (e) {
        switch(name){
            case "date":
                messageDate.innerText = e.message;
                messageDate.setAttribute("class", "block-message");
                break;
            case "nights":
                messageNights.innerText = e.message;
                messageNights.setAttribute("class", "block-message");
                break;
            case "name":
                messageName.innerText = e.message;
                messageName.setAttribute("class", "block-message");
                break;
            case "email":
                messageEmail.innerText = e.message;
                messageEmail.setAttribute("class", "block-message");
                break;
            case "phone":
                messagePhone.innerText = e.message;
                messagePhone.setAttribute("class", "block-message");
                break;
        }
    }
}

const initializeForm = () =>{
    const today = new Date().toISOString().split("T")[0];
    inputDate.setAttribute("min", today); //set min date to today for date input
    inputDate.value = today;
    messageDate.innerText = "*";
    messageNights.innerText = "*";

    messageName.innerText = "*";
    messageEmail.innerText = "*";
    messagePhone.innerText = "*";
}
// Form Elements
const form = getElement("form");
// -- General Info
const inputDate = getElement("#arrival-date");
const inputNights = getElement("#nights");
const inputAdults = getElement("#adults");
const inputChildren = getElement("#children");
const checkEarlyCheckIn = getElement("#early-check-in");
// -- Room Type
const radioStandard = getElement("#standard");
const radioBuisness = getElement("#buisness");
const radioSuite = getElement("#suite");
// -- Bed Type
const radioKing = getElement("#king");
const radioQueen = getElement("#queen");
const radioDouble = getElement("#double");
// -- Contact Info
const inputName = getElement("#name");
const inputEmail = getElement("#email");
const inputPhone = getElement("#phone");
// -- Buttons
const buttonSubmit = getElement("#submit");
const buttonReset = getElement("#reset");
// -- Error Messages
const messageDate = getElement("#date-message");
const messageNights = getElement("#nights-message");
const messageName = getElement("#name-message");
const messageEmail = getElement("#email-message");
const messagePhone = getElement("#phone-message");
// Event Listeners
document.addEventListener("DOMContentLoaded", ()=>{
    initializeForm();
    //Form Buttons
    buttonSubmit.addEventListener("click", function(event){
        processEntry(event);
    });
    buttonReset.addEventListener("click", initializeForm);
    //Validations
    inputDate.addEventListener("change", function(){
        validateEntry(inputDate.value, "date")
    });
    inputNights.addEventListener("change", function(){
        validateEntry(inputNights.value, "nights");
    });

    inputName.addEventListener("change", function(){
        validateEntry(inputName.value, "name");
    });
    inputEmail.addEventListener("change", function(){
        validateEntry(inputEmail.value, "email");
    });
    inputPhone.addEventListener("change", function(){
        validateEntry(inputPhone.value, "phone");
    });
});