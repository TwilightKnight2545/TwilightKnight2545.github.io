"use strict"
const getElement = (selector) => document.querySelector(selector);
//Global Arrays
let selectorOptions = []; // 2d array, [element, isVisible]
let filterList = []; //Will be set to the initial values of selectorOptions[]
let recipieList = []; //[name, description, imagePath, link, prepTime, calories, [tagValues]]
//Parallel Arrays
let activeFilterDisplays = [];
let activeFilterValues = [];

//Helper Functions
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
const addRecipe = (name, description, imagePath, link, prepTime, calories, tags) =>{
    recipieList.push([name, description, imagePath, link, prepTime, calories, tags]);
}

//--Functions
//Filters
const setupInitialOptions = () =>{
    selectorOptions = []; //Clears array, [displayText, value]
    addOption("Filter…", "default");
    // addOption("Meal Type", "seperator");
    // addOption("Breakfast", "breakfast");
    // addOption("Lunch", "lunch");
    // addOption("Dinner", "dinner");
    addOption("Dietary Restrictions", "seperator");
    addOption("Dairy-Free", "dairy-free");
    addOption("Gluten-Free", "gluten-free");
    addOption("Kosher", "kosher");
    addOption("Low Carb", "low-carb");
    addOption("Vegetarian", "vegetarian");
    addOption("Misc.", "seperator");
    addOption("< 15min Prep", "under-fifteen-prep");
    addOption("Requires Oven", "requires-oven");
    
    filterList = selectorOptions;
}
const loadRecipes = () =>{
    // Add recipes here
    addRecipe("Easy Spaghetti", "'This Easy Spaghetti Recipe is ready in just 15 minutes and is a hearty, comforting meal during cooler months. Pair with a side salad or steamed veggies for a full meal and enjoy!' - Averie Sunshine", "../../images/recipes/1spaghetti.png", "https://www.averiecooks.com/easy-15-minute-spaghetti/#:~:text=from%2021%20votes-,Easy%20Spaghetti,-By%20Averie%20Sunshine", "15m", "941", ["under-fifteen-prep"]);

    addRecipe("Easy Homemade Mac and Cheese", "'This Easy Homemade Mac and Cheese Recipe is made with 6 ingredients in 15 minutes on the stovetop (no baking required)! Time to ditch the boxed mac and cheese for this irresistibly creamy, smooth & cheesy homemade recipe!' - Laura", "../../images/recipes/2mac-and-cheese.png", "https://joyfoodsunshine.com/homemade-mac-and-cheese/#:~:text=PRINT-,Easy%20Homemade%20Mac%20and%20Cheese%20Recipe,-LAURA", "15m", "271.1", ["vegetarian", "under-fifteen-prep"]);

    addRecipe("Simple Tomato Soup", "'This easy tomato soup is my go-to recipe. It's simple and delicious, ready in 30 minutes, and I give leftovers to my kids for lunch. I usually serve it with rosemary bread for dunking.' - Barbara Sauermann", "../../images/recipes/3tomato-soup.png", "https://www.allrecipes.com/recipe/269276/simple-tomato-soup/#:~:text=TOMATO%20SOUP%20RECIPES-,Simple%20Tomato%20Soup,-4.7", "30m", "100", ["low-carb", "vegetarian", "gluten-free"]);

    addRecipe("Chicken Noodle Soup", "'Take the time to make Chicken Noodle Soup from scratch and you'll never be able to make it another way again! My mom's version is a step above the rest, made with homemade stock and egg noodles that take just minutes to make.' - Lauren Allen", "../../images/recipes/4chicken-noodle-soup.png", "https://tastesbetterfromscratch.com/chicken-noodle-soup/#:~:text=from%207936%20votes-,Chicken%20Noodle%20Soup,-Take%20the%20time", "40m", "206", ["low-carb"]);
}
const loadSelectorOptions = () =>{
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
            activeFilterValues.push(option);
            activeFilterDisplays.push(buttonDisplay);
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

    activeFilterValues.splice(activeFilterValues.indexOf(filterValue), 1); //Removes the filter from the activeFilterValues list
    loadSelectorOptions();
}
const clearFilters = () =>{
    activeFilterValues = []; //Clears active Filter

    setupInitialOptions();
    setSortType(); //Reset Sort
    loadSelectorOptions();
    divFilters.replaceChildren(); //clears buttons
}
const loadRecipeDisplays = () =>{
    divRecipeDisplay.replaceChildren();
    for (let i = 0; i< recipieList.length; i++){
        displayRecipe(recipieList[i]);
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
    const calories =    inputRecipe[5];
    const tags =        inputRecipe[6];
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
//--Form Elements
//Divs
const divRecipeList = getElement("#recipe-list");
const divRecipeDisplay = getElement("#recipe-display");
const divFilters = getElement("#filters")
const divSortButton = getElement("#div-sort-button")
//Controls
const selectFilter = getElement("#filter-options");
const selectSort = getElement("#sort-options")
const optionDefaultFilter = getElement("#filter-default");
const optionDefaultSort = getElement("#sort-default")
const buttonClearFilters = getElement("#reset");

//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    setupInitialOptions();
    loadRecipes();
    loadSelectorOptions();
    selectFilter.addEventListener("change", addFilter);
    selectSort.addEventListener("click", setSortType);
    buttonClearFilters.addEventListener("click", clearFilters);
});