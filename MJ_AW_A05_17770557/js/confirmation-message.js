"use strict"
const getElement = (selector) => document.querySelector(selector);
//Helper Functions
const createElementWithText = (tagName, text) =>{
    const tempElement = document.createElement(tagName);
    tempElement.innerHTML = text;
    tempElement.setAttribute("class", "results");
    return tempElement;
}
//Functions
const loadPage = () =>{
    fieldset.appendChild(createElementWithText("p", (sessionStorage.name + " - " + sessionStorage.email))); //Name - Email
    fieldset.appendChild(createElementWithText("p", ("(" + sessionStorage.phone.substring(0,3) + ")" + sessionStorage.phone.substring(3,6) + "-" + sessionStorage.phone.substring(6)))); //Phone Number
    fieldset.appendChild(createElementWithText("p", ("Adults: " + sessionStorage.adults + " | Children: " + sessionStorage.children))); //Adults: # | Children: #
    fieldset.appendChild(createElementWithText("p", ("You have a <u><b>" + sessionStorage.roomType + "</b></u> with a <u><b>" + sessionStorage.bedType + "</u></b> bed."))); //You have a [roomType] with a [bedType] bed.
    
    const dateTimeFormat2 = new Intl.DateTimeFormat("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
    fieldset.appendChild(createElementWithText("p", ("Your arrival date is: " + dateTimeFormat2.format(new Date(sessionStorage.arrivalDate))))); //Your arrival date is: [date]

    if(sessionStorage.isEarylCheckIn == "true"){
        fieldset.appendChild(createElementWithText("p", ("Check-in is as early as 11:00AM"))); //Name - Email
    }
    else{
        fieldset.appendChild(createElementWithText("p", ("Check-in is 3:00PM"))); //Name - Email
    }
}
//Form Element
const fieldset = getElement("#message");
//Event Listeners
document.addEventListener("DOMContentLoaded", ()=>{
    loadPage();
})