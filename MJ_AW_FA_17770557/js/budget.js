"use strict"

const getElement = (selector) => document.querySelector(selector);

//Helper Functions
const formatCurrency = (number) => {return new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(number)}
const formatNumber = (currency) => {return parseFloat(currency.replace(/[^\d\.]/g, ""));}
//Functions
//On mouse Down
const formatElementNumber = (element) => {
    element.value = formatNumber(element.value)
    if(parseFloat(element.value) == 0.0)
        element.value = "";
} //Called on mousedown, removes dollar sign
const formatInputNumber = (element) => {
    if(element.value != ""){
        element.value = formatNumber(element.value)
        if(parseFloat(element.value) == 0.0)
            element.value = "";
    }
} //Called on mousedown, removes dollar sign

//Focus Out
const formatSavingsOutputs = (element) =>{
    element.value = (isNaN(element.value) || element.value == "" || parseFloat(element.value) < 0) ? formatCurrency("0.0") : formatCurrency(element.value);
    if(formatNumber(element.value) > formatNumber(outputNetIncome.value)){ //Can only set aside at most the net income
        element.value = outputNetIncome.value;
    }
    //Set the other field to the remainder of Net Income - This Field
    if(element == outputSavings){
        outputDisposableIncome.value = formatCurrency(formatNumber(outputNetIncome.value) - formatNumber(element.value))
    }
    else{
        outputSavings.value = formatCurrency(formatNumber(outputNetIncome.value) - formatNumber(element.value))
    }
    //Format % Saved
    outputSavingPercent.innerText = ((formatNumber(outputSavings.value) / formatNumber(outputNetIncome.value)) * 100) + "%";
} //Called on focusout, formats to currency
const formatInputs = (element) =>{
    if(element.value != ''){
        element.setAttribute("class", ""); //Initially valid
        if(isNaN(element.value.replace("$", "")))
            element.setAttribute("class", "invalid-entry");

        //Check if it should be a currency or not
        if(element.getAttribute("int") == "true"){
            element.value = (isNaN(element.value) || parseFloat(element.value) < 0) ? "" : Math.ceil(parseFloat(element.value));
        }
        else{
            element.value = (isNaN(element.value) || parseFloat(element.value) < 0) ? "" : formatCurrency(element.value);
        }
    }
        
} //Called on focusout, formats to currency
//--Switch Income Type

const useWage = () =>{
    buttonWages.setAttribute("class", "selected");
    buttonSalary.setAttribute("class", "");

    divWageTab.setAttribute("style", "display: block;")
    outputAnnualIncome.setAttribute("style", "display: inline-block;")
    labelAnnualIncome.setAttribute("style", "display: inline-block;")
    divSalaryTab.setAttribute("style", "display: none;")
}
const useSalary = () =>{
    buttonSalary.setAttribute("class", "selected");
    buttonWages.setAttribute("class", "");

    divSalaryTab.setAttribute("style", "display: block;")
    outputAnnualIncome.setAttribute("style", "display: none;")
    labelAnnualIncome.setAttribute("style", "display: none;")
    divWageTab.setAttribute("style", "display: none;")
}
const calcDisposableIncome = () =>{
    const netIncome = parseFloat(outputNetIncome.value.replace("$", ""));
    const percentSaved = parseFloat(outputSavingPercent.innerText.replace("%", "")) / 100;
    
    outputSavings.value = formatCurrency((netIncome * percentSaved).toFixed(2));
    outputDisposableIncome.value = formatCurrency((netIncome * (1 - percentSaved)).toFixed(2));
}
const calcTotalIncome = () =>{
    if(buttonWages.getAttribute("class") == "selected"){
        if(inputHourlyWage.value != "" && inputHoursPerWeek.value != ""){
            outputMonthlyIncome.value = formatCurrency(formatNumber(inputHourlyWage.value) * parseFloat(inputHoursPerWeek.value) * 4.3452381/*Weeks in a month*/ );
            outputAnnualIncome.value = formatCurrency(formatNumber(outputMonthlyIncome.value) * 12);
        }
        else{
            outputMonthlyIncome.value = "";
            outputAnnualIncome.value = "";
        }
    }
    else{
        outputMonthlyIncome.value = formatCurrency(formatNumber(inputAnnualSalary.value) / 12);
    }
}
const calcTotalExpenses = () =>{

}
const calcAnnual = () =>{
    outputNetIncomeAnnual.value = formatCurrency(formatNumber(outputNetIncome.value) * 12);
    outputSavingsAnnual.value = formatCurrency(formatNumber(outputSavings.value) * 12);
    outputDisposableIncomeAnnual.value = formatCurrency(formatNumber(outputDisposableIncome.value) * 12);
}
//Page Elements
//--Divs
const divWageTab = getElement("#wages-tab");
const divSalaryTab = getElement("#salary-tab");
//--Buttons
const buttonWages = getElement("#wages");
const buttonSalary = getElement("#salary");
//--Inputs
const inputHourlyWage = getElement("#hourly-wage");
const inputHoursPerWeek = getElement("#hours-per-week");
const inputAnnualSalary = getElement("#annual-salary");

const inputRent = getElement("#monthly-payments");
const inputElectric = getElement("#electric");
const inputHeating = getElement("#heating");
const inputWater = getElement("#water");

const inputInternet = getElement("#internet");
const inputPhone = getElement("#phone");

const inputFood = getElement("#food");
const inputGas = getElement("#gas");

const rangePercentSaved = getElement("#range-saving");
//--Outputs
const outputMonthlyIncome = getElement("#monthly-income");
const outputAnnualIncome = getElement("#annual-income");

const outputNetIncome = getElement("#net-income");
const outputNetIncomeAnnual = getElement("#annual-net-income");
const outputSavingPercent = getElement("#percent-saved");

const outputSavings = getElement("#savings");
const outputSavingsAnnual = getElement("#annual-savings")

const outputDisposableIncome = getElement("#disposable-income");
const outputDisposableIncomeAnnual = getElement("#annual-disposable-income");
//--Labels
const labelAnnualIncome = getElement("#annual-income-label");
//Event Listener
document.addEventListener("DOMContentLoaded", () => {
    //Inputs
    //--Income
    buttonWages.addEventListener("click", function(){useWage(); calcTotalIncome();});
    buttonSalary.addEventListener("click", function(){useSalary(); calcTotalIncome();});

    inputHourlyWage.addEventListener("mousedown", function(){formatInputNumber(inputHourlyWage);})
    inputHourlyWage.addEventListener("focusout", function(){formatInputs(inputHourlyWage); calcTotalIncome()})

    inputHoursPerWeek.addEventListener("mousedown", function(){formatInputNumber(inputHoursPerWeek);})
    inputHoursPerWeek.addEventListener("focusout", function(){formatInputs(inputHoursPerWeek); calcTotalIncome()})
    
    inputAnnualSalary.addEventListener("mousedown", function(){formatInputNumber(inputAnnualSalary);})
    inputAnnualSalary.addEventListener("focusout", function(){formatInputs(inputAnnualSalary); calcTotalIncome()})
    //--Expenses
    //----Housing
    inputRent.addEventListener("mousedown", function(){formatInputNumber(inputRent);})
    inputRent.addEventListener("focusout", function(){formatInputs(inputRent); calcTotalExpenses()})

    inputElectric.addEventListener("mousedown", function(){formatInputNumber(inputElectric);})
    inputElectric.addEventListener("focusout", function(){formatInputs(inputElectric); calcTotalExpenses()})

    inputHeating.addEventListener("mousedown", function(){formatInputNumber(inputHeating);})
    inputHeating.addEventListener("focusout", function(){formatInputs(inputHeating); calcTotalExpenses()})

    inputWater.addEventListener("mousedown", function(){formatInputNumber(inputWater);})
    inputWater.addEventListener("focusout", function(){formatInputs(inputWater); calcTotalExpenses()})
    //----Utilities
    inputInternet.addEventListener("mousedown", function(){formatInputNumber(inputInternet);})
    inputInternet.addEventListener("focusout", function(){formatInputs(inputInternet); calcTotalExpenses()})
    
    inputPhone.addEventListener("mousedown", function(){formatInputNumber(inputPhone);})
    inputPhone.addEventListener("focusout", function(){formatInputs(inputPhone); calcTotalExpenses()})
    //----Misc. Expenses
    inputFood.addEventListener("mousedown", function(){formatInputNumber(inputFood);})
    inputFood.addEventListener("focusout", function(){formatInputs(inputFood); calcTotalExpenses()})

    inputGas.addEventListener("mousedown", function(){formatInputNumber(inputGas);})
    inputGas.addEventListener("focusout", function(){formatInputs(inputGas); calcTotalExpenses()})

    //Results
    rangePercentSaved.addEventListener("input", function(){
        calcDisposableIncome();
        calcAnnual();
    });
    outputSavings.addEventListener("mousedown", function(){formatElementNumber(outputSavings);})
    outputSavings.addEventListener("focusout", function(){formatSavingsOutputs(outputSavings); calcAnnual();})
    outputDisposableIncome.addEventListener("mousedown", function(){formatElementNumber(outputDisposableIncome);})
    outputDisposableIncome.addEventListener("focusout", function(){formatSavingsOutputs(outputDisposableIncome); calcAnnual();})
})