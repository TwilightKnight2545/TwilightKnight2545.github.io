"use strict"
//Get Element
const getElement = (selector) => document.querySelector(selector);

//Helper Functions
let getSubtotal = () =>{
    const subtotal = subtotalInput.value;

    return parseFloat(subtotal);
};
let getTaxRate = () =>{
    const taxRate = taxRateInput.value;

    return (parseFloat(taxRate) / 100); //converts the input to a percent
};

//Functions
const processEntry = () =>{
    if(!isNaN(subtotalInput.value) && getSubtotal() > 0 && getSubtotal() <= 10000){
        if(!isNaN(taxRateInput.value) && getTaxRate() > 0 && getTaxRate() <= .12){
            calculate();
            errorMessage.innerText = "";

            subtotalInput.select();
            subtotalInput.focus();
        }
        else{
            errorMessage.innerText = "Tax Rate should be between 0 and 12%";

            clearTaxRate();
            taxRateInput.select();
            taxRateInput.focus();
        }
        
    }
    else{
        errorMessage.innerText = "Subtotal should be between 0 and 10,000";
        
        clearSubtotal();
        subtotalInput.select();
        subtotalInput.focus();
    }
};

const calculate = () => {
    const salesTax = getSubtotal() * getTaxRate();
    const total = getSubtotal() + salesTax;

    const salesTaxDisplay = "$" + salesTax.toFixed(2);
    const totalDisplay = "$" + total.toFixed(2);

    salesTaxOutput.value = salesTaxDisplay;
    totalOutput.value = totalDisplay;
};

const clearAll = () => {
    subtotalInput.value = "";
    taxRateInput.value = "";
    salesTaxOutput.value = "";
    totalOutput.value = "";
};

const clearSubtotal = () =>{
    subtotalInput.value = "";
};

const clearTaxRate = () =>{
    taxRateInput.value = "";
};


//Form Elements
const calculateButton = getElement("#calculate");
const clearButton = getElement("#clear");

const subtotalInput = getElement("#subtotal");
const taxRateInput = getElement("#tax_rate");
const salesTaxOutput = getElement("#sales_tax");
const totalOutput = getElement("#total");

const errorMessage = getElement("#error");


//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    calculateButton.addEventListener("click", processEntry);
    clearButton.addEventListener("click", clearAll);

    subtotalInput.select();
    subtotalInput.focus(); //Sets focus on the subtotal input when the page loads
});