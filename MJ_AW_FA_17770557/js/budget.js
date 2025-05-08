"use strict"

const getElement = (selector) => document.querySelector(selector);

//Helper Functions

//Functions
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
    const netIncome = parseDouble(outputNetIncome.replace("$", ""));
    alert(netIncome)
    
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
const outputSavings = getElement("#savings");
const outputSavingPercent = getElement("percent-saved");
const outputDisposableIncome = getElement("#disposable-income");
//--Labels
const labelAnnualIncome = getElement("#annual-income-label");
//Event Listener
document.addEventListener("DOMContentLoaded", ()=>{
    buttonWages.addEventListener("click", useWage);
    buttonSalary.addEventListener("click", useSalary);

    rangePercentSaved.addEventListener("input", calcDisposableIncome); //currently broken, ask Rene
})