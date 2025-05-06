"use strict"
const getElement = (selector) => document.querySelector(selector);
//Global Arrays
let selectorOptions = []; // 2d array, [element, isVisible]
let filterList = []; //Will be set to the initial values of selectorOptions[]
let recipieList = []; //[name, description, imagePath, link, prepTime, calories, [tagValues]]
//Parallel Arrays

let activeFilters = [];

//Recipe Helper Functions
const addOption = (text, value) =>{
    const element = document.createElement("option");
    // const textNode = document.createTextNode(text);
    element.innerText = text;
    element.value = value;
    if (value != "seperator"){
        element.id = value;
    }
    else{
        element.setAttribute("class", value);
    }

    selectorOptions.push([element, true]);
}
const createTag = (innerText, isTagInfo) =>{ //if isTagInfo is true
    const tag = document.createElement("li");
    if(isTagInfo){
        tag.setAttribute("class", "recipe-info");
    }
    tag.innerText = innerText;

    return tag;
}
const addRecipe = (name, description, imagePath, link, prepTime, servings, calories, tags) =>{
    recipieList.push([name, description, imagePath, link, prepTime, servings, calories, tags]);
    console.log(name)
}
const sortRecipes = (tempRecipeList, sortKey, existingSortButton, order = existingSortButton.getAttribute("order")) =>{ //Customized sort function to sort the recipe arrays by a specific element
    tempRecipeList.sort(function(a,b){
        let x = a[sortKey];
        let y = b[sortKey];
        if(sortKey == 5){//Triggers for servings
            if(x.includes("-")){
                if(order == "asc"){ //Use first number -- basically, if its sorting from least servings to most, use the larger number
                    x = x.split("-")[0];
                }
                else{ //Use second number
                    x = x.split("-")[1];
                }
            }
            if(y.includes("-")){
                if(order == "asc"){ //Use first number
                    y = y.split("-")[0];
                }
                else{ //Use second number
                    y = y.split("-")[1];
                }
            }
        }
        if(sortKey != 0){ //Triggers for anything but alphabetical sorting
            x = parseInt(x);
            y = parseInt(y);
        }
        if(x < y){
            if(order == "asc"){
                return -1;
            }
            else{ //Descending
                return 1;
            }
        }
        else if(x == y){
            return 0;
        }
        else{
            if(order == "asc"){
                return 1;
            }
            else{ //Descending
                return -1;
            }
        }
    })
}
//-- Recipe Functions
//Filters
const setupInitialOptions = () =>{
    selectorOptions = []; //Clears array, [displayText, value]
    addOption("Filter…", "default");
    // addOption("Meal Type", "seperator");
    addOption("Breakfast", "breakfast");
    // addOption("Lunch", "lunch");
    // addOption("Dinner", "dinner");
    addOption("Dessert", "dessert");
    addOption("Dietary Restrictions", "seperator");
    addOption("Dairy-Free", "dairy-free");
    addOption("Gluten-Free", "gluten-free");
    // addOption("Kosher", "kosher");
    addOption("Low Carb", "low-carb");
    addOption("Vegetarian", "vegetarian");
    addOption("Misc.", "seperator");
    addOption("< 15min Prep", "under-fifteen-prep");
    // addOption("Requires Oven", "requires-oven");
    
    filterList = selectorOptions;
}
const loadRecipes = async () =>{
    getJSONDocument().then(data=>{
        let test = 0
        data.forEach(item => {
            addRecipe(item.name, item.description, item.imagePath, item.link, item.prepTime, item.servings, item.calories, item.tags);
        })
    }).then(data=> loadSelectorOptions())
    .catch(err => console.error(err));
    
}
const loadSelectorOptions = () =>{ //Sets up the filter options
    selectFilter.replaceChildren() //Clears Options
    selectorOptions.forEach(option => { //Adds every option in the array to the select element
        if (option[1] == true){
            selectFilter.appendChild(option[0]);
        }
    });
    selectFilter.selectedIndex = 0; // Resets the select back to the default
    //Call function to display recipies
    loadRecipeDisplays();
}
const addFilter = () =>{
    const option = selectFilter.value
    
    if(option != optionDefaultFilter.value){ //Only runs the code if the selected option isn't the "Filter..."
        if(option != "seperator"){
            let optionIndex = 0;
            selectorOptions.forEach(selectorOption =>{
                if(selectorOption[0].value == option){
                    optionIndex = selectorOptions.indexOf(selectorOption)
                }
            })
            //Adds button
            const button = document.createElement("button");
            const buttonDisplay = selectorOptions[optionIndex][0].innerText;
            button.innerHTML = ("<i>✓ </i>" + buttonDisplay);
            button.id = option;
            button.setAttribute("class", "filter-button");
            button.addEventListener("click", function(){
                removeFilter(button, option);
            });
            divFilters.appendChild(button);
            //Adds the filter to the active filter list, removes from the select options lit
            activeFilters.push(option);
            selectorOptions[optionIndex] = [selectorOptions[optionIndex][0], false]
            
            loadSelectorOptions();
            
        }
        selectFilter.selectedIndex = 0; // Resets the select back to the default
    }
    
}
const removeFilter = (button, filterValue) =>{
    divFilters.removeChild(button);
    selectorOptions.forEach(option => {
        if(option[0].value == filterValue){
            option[1] = true; //Sets the isVisible value to true, causing it to show up again in the array
        }
    });

    activeFilters.splice(activeFilters.indexOf(filterValue), 1); //Removes the filter from the activeFilters list
    loadSelectorOptions();
}
const clearFilters = () =>{
    activeFilters = []; //Clears active Filter
    setupInitialOptions();
    setSortType(); //Reset Sort
    
    divFilters.replaceChildren(); //clears buttons
    inputSearchBar.value = "";
    loadSelectorOptions();
}
const loadRecipeDisplays = () =>{
    //--Sort List
    //Setup temp list
    let tempRecipeList = [];
    recipieList.forEach(recipe =>{
        tempRecipeList.push(recipe);
    })
    //Sort the list
    const existingSortButton = getElement("#sort-button");
    if(existingSortButton != null){
        let sortKey;
        sortRecipes(tempRecipeList, 0, existingSortButton, "asc"); //Sorts Alphabetically first
        switch(existingSortButton.value.toLowerCase()){
            case "alphabeticaly":
                sortKey = 0;
                break;
            case "calories":
                sortKey = 6;
                break;
            case "prep time": 
                //Format to minutes
                tempRecipeList.forEach(recipe =>{
                    let prepTime = recipe[4];
                    if(prepTime.includes("h")){
                        recipe[4] = (/*Hours*/parseInt(prepTime.split("h")[0] * 60) + /*Minutes*/ parseInt(prepTime.split("h")[1].trim())).toString();
                    }
                    else{ //Drop the m
                        recipe[4] = prepTime.substring(0, prepTime.length - 1);
                    }
                })
                sortKey = 4;
                break;
            case "servings":
                sortKey = 5;
                break;
        }
        //Sort
        sortRecipes(tempRecipeList, sortKey, existingSortButton);

        //Re-format Prep Time
        if(existingSortButton.value.toLowerCase() == "prep time"){
            tempRecipeList.forEach(recipe =>{
                const prepTime = parseInt(recipe[4]);
                let prepTimeDisplay = "";
                
                let prepTimeHour = Math.floor(prepTime / 60);
                let prepTimeMinutes = prepTime % 60;
    
                if(prepTimeMinutes == 0){//Even Hour
                    prepTimeDisplay = prepTimeHour + "h";
                }
                else if(prepTimeHour == 0){//Under an hour
                    prepTimeDisplay = prepTime + "m";
                }
                else{//Hours and minutes
                    prepTimeDisplay = prepTimeHour + "h " + prepTimeMinutes + "m";
                }
                recipe[4] = prepTimeDisplay;
            })
        }
        
    }

    //Display
    divRecipeDisplay.replaceChildren();
    //No Filters
    if(activeFilters.length == 0){
        for (let i = 0; i< tempRecipeList.length; i++){
            if(tempRecipeList[i][0].toLowerCase().includes(inputSearchBar.value.toLowerCase()) || inputSearchBar.value == ""){
                displayRecipe(tempRecipeList[i]);
            }
        }
    }
    else{//Any amount of filters
        for (let i = 0; i< tempRecipeList.length; i++){
            let doesMeetConditions = true;
            activeFilters.forEach(filter =>{
                if(tempRecipeList[i][7].includes(filter) == false){
                    doesMeetConditions = false;
                }
            })
            if(doesMeetConditions){
                if(tempRecipeList[i][0].toLowerCase().includes(inputSearchBar.value.toLowerCase()) || inputSearchBar.value == ""){
                    displayRecipe(tempRecipeList[i]);
                }
            }
        }
    }
    
}
//Sort
const setSortType = () =>{
    if(selectSort.value != optionDefaultSort.value){
        let sortText = "Sort: " + selectSort.value + " ↑";
        const divFiltersArray = divFilters.childNodes;
        const existingSortButton = getElement("#sort-button");
        const sortButton = document.createElement("button");
        let doesSortButtonExist = false;
        divFiltersArray.forEach(element =>{
            if(element == existingSortButton && existingSortButton != null){
                doesSortButtonExist = true;
            }
        })
        if(doesSortButtonExist){
            existingSortButton.innerText = sortText;
            existingSortButton.id = "sort-button";
            existingSortButton.value = selectSort.value;
            existingSortButton.setAttribute("order", "asc");
            existingSortButton.addEventListener("click", toggleOrder);
        }
        else{
            sortButton.innerText = sortText;
            sortButton.id = "sort-button";
            sortButton.value = selectSort.value;
            sortButton.setAttribute("order", "asc");
            sortButton.addEventListener("click", toggleOrder);

            divFilters.appendChild(sortButton);
        }
    }
    //Reset Select back to default value
    selectSort.selectedIndex = 0;
    loadRecipeDisplays();
}
const toggleOrder = () =>{
    const sortButton = getElement("#sort-button");
    if(sortButton.getAttribute("order") == "asc"){
        sortButton.setAttribute("order", "desc");
        sortButton.innerText = "Sort: " + sortButton.value + " ↓";
    }
    else{
        sortButton.setAttribute("order", "asc");
        sortButton.innerText = "Sort: " + sortButton.value + " ↑";
    }
    loadRecipeDisplays();
}
//Recipes
const displayRecipe = (inputRecipe) =>{
    const name =        inputRecipe[0];
    const description = inputRecipe[1];
    const imagePath =   inputRecipe[2];
    const link =        inputRecipe[3];
    const prepTime =    inputRecipe[4];
    const servings =    inputRecipe[5]
    const calories =    inputRecipe[6];
    const tags =        inputRecipe[7];
    //--Recipe Block
    const recipe = document.createElement("div");
    recipe.setAttribute("class", "recipe");
    //--Image
    const linkedImage = document.createElement("a");
    linkedImage.href = link;
    linkedImage.target = "_blank";

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = "recipe";

    linkedImage.appendChild(image);
    recipe.appendChild(linkedImage);
    //--Details
    //Div
    const details = document.createElement("div");
    details.setAttribute("class", "recipe-details");
    //Recipe Name
    const recipeName = document.createElement("h4");
    let recipeText = document.createTextNode(name);
    recipeName.appendChild(recipeText);
    
    details.appendChild(recipeName);
    //--Tags
    const tagList = document.createElement("ul");
    
    //Prep Time
    tagList.appendChild(createTag(("Prep Time: " + prepTime), true));
    //Servings
    tagList.appendChild(createTag((servings + " servings"), true));
    //Calories
    tagList.appendChild(createTag((calories + " cal"), true));

    //Additional Tags
    tags.forEach(additionalTag =>{
        filterList.forEach(pair =>{
            if(pair[0].value == additionalTag){
                tagList.appendChild(createTag((pair[0].innerText), false));
            }
        })
    })
    details.appendChild(tagList);
    //Recipe Description
    const recipeDescription = document.createElement("p");
    recipeText = document.createTextNode(description);
    recipeDescription.appendChild(recipeText);

    details.appendChild(recipeDescription);
    
    //Display
    recipe.appendChild(details);
    divRecipeDisplay.appendChild(recipe);
    
}
//-- Price Calc Functions
const validateCalculator = () =>{
    let price = 0.0;
        if(inputPrice.value.includes("$")){
            price = parseFloat(inputPrice.value.substring(1));
        }
        else{
            price = parseFloat(inputPrice.value);
        }
        if(!isNaN(price) && parseFloat(price) > 0){ //If price is a number
            //formats the value -- Not strictly necessary here, but good practice, and it looks nice
            inputPrice.value = "$" + price.toFixed(2);
        }

    if(!isNaN(inputMeals.value) && inputMeals.value > 0){
        if(!isNaN(price)){
            updateCalculator(parseInt(inputMeals.value), price);
            errorMessage.innerText = "";
        }
        else{
            errorMessage.innerText = "Please enter a price greater than 0.";
            outputPerWeek.innerText = "$0.00/week";
            outputPerMonth.innerText = "$0.00/month";
            inputPrice.select();
        }
    }
    else{
        errorMessage.innerText = "Please enter a number greater than 0.";
        outputPerWeek.innerText = "$0.00/week";
        outputPerMonth.innerText = "$0.00/month";
        inputMeals.select();
    }
}
const updateCalculator = (orderQty, price) =>{
    const pricePerWeek = orderQty * price;
    const pricePerMonth = pricePerWeek * 4;
    outputPerWeek.innerText = new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(pricePerWeek) + "/week";
    outputPerMonth.innerText = new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(pricePerMonth) + "/month";
}
//-- Form Elements
//Divs
const divRecipeList = getElement("#recipe-list");
const divRecipeDisplay = getElement("#recipe-display");
const divFilters = getElement("#filters");
const divSortButton = getElement("#div-sort-button");
//Controls
const selectFilter = getElement("#filter-options");
const selectSort = getElement("#sort-options");
const optionDefaultFilter = getElement("#filter-default");
const optionDefaultSort = getElement("#sort-default");
const buttonClearFilters = getElement("#reset");
const inputSearchBar = getElement("#search");
//Price Calc
const inputMeals = getElement("#meals-per-week");
const inputPrice = getElement("#price-of-meal");

const outputPerWeek = getElement("#per-week");
const outputPerMonth = getElement("#per-month");
const errorMessage = getElement("#error-message");
//Get JSON Document
const getJSONDocument = async () =>{
    const response = await fetch("../food/recipes.json");
    const data = await response.json();
    return data
}
//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    setupInitialOptions();
    loadRecipes();
    selectFilter.addEventListener("change", addFilter);
    selectSort.addEventListener("change", setSortType);
    buttonClearFilters.addEventListener("click", clearFilters);
    inputSearchBar.addEventListener("change", loadRecipeDisplays);
    inputMeals.addEventListener("change", validateCalculator);
    inputPrice.addEventListener("change", validateCalculator);
});