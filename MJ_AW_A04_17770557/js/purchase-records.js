"use strict"
const getElement = (selector) => document.querySelector(selector);
let requiredFieldsFilled = 0; //Used to dynamically control the CSS
// Helper Functions
const clearSpan = (spanElement) =>{
    spanElement.innerText = "";
}

const setDateRange = () =>{
    const today = new Date();
    const oneMonthAgo = new Date(new Date(today).setMonth(today.getMonth() - 1));
    
    const todayString = today.toISOString().split("T")[0];
    const oneMonthAgoString = oneMonthAgo.toISOString().split("T")[0]

    //Sets the valid dates to be from today to one month ago.
    inputDate.max = todayString;
    inputDate.min = oneMonthAgoString;
}

// -- Functions
const resetForm = () =>{
    inputEmail.value = "";
    inputDate.value = "";
    inputPrice.value = "";

    outputLabel.value = "";
    selectDiscount.selectedIndex = 0;

    spanEmail.innerText = "*";
    spanDate.innerText = "*";
    spanPrice.innerText = "*";

    updateBackground();
}
const processEntry = () =>{ //my calculateDiscount
    //Validates data
    checkIfExists(inputEmail.value, "email");
    checkIfExists(inputDate.value, "date");
    checkIfExists(inputPrice.value, "price");
        
    if(spanEmail.innerText || spanDate.innerText || spanPrice.innerText){
        return;
    }
    const initialPrice = parseFloat(inputPrice.value.substring(1)); //Removes the dollar sign that is automatically added
    let discountedPrice = 0.0; //Not an important comment, but I noticed the value looks like a face, and found that amusing.
    
    switch(selectDiscount.value){
        case "none":
            discountedPrice = initialPrice;
            break;
        case "military":
            discountedPrice = initialPrice * 0.9; //10% Off
            break;
        case "student":
            discountedPrice = initialPrice * 0.9; //10% Off
            break;
        case "aarp":
            discountedPrice = initialPrice * 0.85; //15% Off
            break; 
    }
    const displayValue = new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(discountedPrice);
    outputLabel.value = displayValue;

}

const checkIfExists = (text, name) =>{ //Accepts the value of an element and the error name for if the element is not valid
    const emailError = Error("Please enter a valid Email");
    const dateError = Error("Please enter a valid Date");
    const priceError = Error("Please enter a valid Price");
    try {
        if(!text){//if the text isn't an empty string
            switch(name){
                case "email":
                    throw emailError;
                case "date":
                    throw dateError;
                case "price":
                    throw priceError;
            }
        }
        else{//Validates the data
            switch(name){
                case "email":
                    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
                    if(emailPattern.test(text)){
                        clearSpan(spanEmail);
                        requiredFieldsFilled ++;
                        break;
                    }
                    else{
                        throw emailError;
                    }
                    
                case "date":
                    clearSpan(spanDate);
                    requiredFieldsFilled ++;
                    break;
                case "price":
                    let price = 0.0;
                    if(text.includes("$")){
                        price = parseFloat(text.substring(1));
                    }
                    else{
                        price = parseFloat(text);
                    }
                    if(!isNaN(price) && parseFloat(price) > 0){ //If price is a number
                        //formats the value -- Not strictly necessary here, but good practice, and it looks nice
                        inputPrice.value = "$" + price.toFixed(2);

                        clearSpan(spanPrice);
                        requiredFieldsFilled ++;
                        break;
                    }
                    else{
                        throw priceError;
                    }
            }
        }
    } catch (e) {
        switch(name){
            case "email":
                spanEmail.innerText = e.message;
                break;
            case "date":
                spanDate.innerText = e.message;
                break;
            case "price":
                spanPrice.innerText = e.message;
                break;
        }
    } finally{
        updateBackground();
    }
}

// Asthetic Function
const updateBackground = () =>{
    requiredFieldsFilled = 0;
    if(!spanEmail.innerText){
        requiredFieldsFilled++;
    }
    if(!spanDate.innerText){
        requiredFieldsFilled++;
    }
    if(!spanPrice.innerText){
        requiredFieldsFilled++;
    }
    //Update
    switch (requiredFieldsFilled){
        case 0:
            body.setAttribute("class", "zero-of-three");
            break;
        case 1:
            body.setAttribute("class", "one-of-three");
            break;
        case 2:
            body.setAttribute("class", "two-of-three");
            break;
        case 3:
            body.setAttribute("class", "three-of-three");
            break;
        
    }
}

//--Form Elements
const body = getElement("#body");
// Inputs
const inputEmail = getElement("#email-input");
const inputDate = getElement("#date-input");
const inputPrice = getElement("#purchase-amount-input");
const selectDiscount = getElement("#discount-type-selector");

const outputLabel = getElement("#form-output");
// Buttons
const buttonProcess = getElement("#button-process");
const buttonReset = getElement("#button-reset");
//Spans
const spanEmail = getElement("#for-email");
const spanDate = getElement("#for-date");
const spanPrice = getElement("#for-purchase-amount");

// Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    inputEmail.addEventListener("change", function(){
        checkIfExists(inputEmail.value, "email");
    });

    inputDate.addEventListener("change", function(){
        checkIfExists(inputDate.value, "date");
    });

    inputPrice.addEventListener("change", function(){
        checkIfExists(inputPrice.value, "price");
    });

    selectDiscount.addEventListener("change", processEntry);
    buttonProcess.addEventListener("click", processEntry);
    buttonReset.addEventListener("click", resetForm);

    setDateRange();

});