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
const addRecipe = (name, description, imagePath, link, prepTime, servings,calories, tags) =>{
    recipieList.push([name, description, imagePath, link, prepTime, servings, calories, tags]);
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
const loadRecipes = () =>{
    // Add recipes here (Broken up into groups of five to make it easier to read)
    // 1-5
    addRecipe("Easy Spaghetti", "'This Easy Spaghetti Recipe is ready in just 15 minutes and is a hearty, comforting meal during cooler months. Pair with a side salad or steamed veggies for a full meal and enjoy!' - Averie Sunshine", "../../images/recipes/1spaghetti.png", "https://www.averiecooks.com/easy-15-minute-spaghetti/#:~:text=from%2021%20votes-,Easy%20Spaghetti,-By%20Averie%20Sunshine", "15m", "4-6","941", ["under-fifteen-prep"]);

    addRecipe("Easy Homemade Mac and Cheese", "'This Easy Homemade Mac and Cheese Recipe is made with 6 ingredients in 15 minutes on the stovetop (no baking required)! Time to ditch the boxed mac and cheese for this irresistibly creamy, smooth & cheesy homemade recipe!' - Laura", "../../images/recipes/2mac-and-cheese.png", "https://joyfoodsunshine.com/homemade-mac-and-cheese/#:~:text=PRINT-,Easy%20Homemade%20Mac%20and%20Cheese%20Recipe,-LAURA", "15m", "8", "271.1", ["vegetarian", "under-fifteen-prep"]);

    addRecipe("Simple Tomato Soup", "'This easy tomato soup is my go-to recipe. It's simple and delicious, ready in 30 minutes, and I give leftovers to my kids for lunch. I usually serve it with rosemary bread for dunking.' - Barbara Sauermann", "../../images/recipes/3tomato-soup.png", "https://www.allrecipes.com/recipe/269276/simple-tomato-soup/#:~:text=TOMATO%20SOUP%20RECIPES-,Simple%20Tomato%20Soup,-4.7", "30m", "6", "100", ["gluten-free", "low-carb", "vegetarian"]);

    addRecipe("Chicken Noodle Soup", "'Take the time to make Chicken Noodle Soup from scratch and you'll never be able to make it another way again! My mom's version is a step above the rest, made with homemade stock and egg noodles that take just minutes to make.' - Lauren Allen", "../../images/recipes/4chicken-noodle-soup.png", "https://tastesbetterfromscratch.com/chicken-noodle-soup/#:~:text=from%207936%20votes-,Chicken%20Noodle%20Soup,-Take%20the%20time", "40m", "8", "206", ["low-carb"]);

    addRecipe("Easy Gluten-Free Broccoli Cheese Soup", "'Craving comfort food? Our Gluten-Free Broccoli Cheese Soup recipe is calling your name! Thick, creamy, cheesy, and delicious.' - Emily Dixon, One Lovely Life", "../../images/recipes/5-cheesy-broccoli-soup.png", "https://www.onelovelylife.com/gluten-free-broccoli-cheese-soup/#tasty-recipes-45299-jump-target:~:text=what%20you%20think!-,easy%20gluten%2Dfree%20broccoli%20cheese%20soup,-5%20Stars", "35m", "4-5", "580", ["gluten-free", "vegetarian"]);

    // 6-10
    addRecipe("French Toast", "'This classic French toast recipe is an easy, delicious breakfast. I love it with fresh fruit and maple syrup on top!' - Jeanine and Jack", "../../images/recipes/6french-toast.png", "https://www.loveandlemons.com/french-toast/#wprm-recipe-container-43887:~:text=GO-,French%20Toast,-rate%20this%20recipe", "20m", "4", "786", ["breakfast", "vegetarian"]);

    addRecipe("Fried Egg Sandwich", "'This fried egg sandwich makes great comfort food! You can use any type of bread or cheese that you want for this quick and easy breakfast. Serve with fruit and juice and/or milk for a full breakfast.' - Erica", "../../images/recipes/7fried-egg-sandwich.png", "https://www.allrecipes.com/recipe/21004/fried-egg-sandwich/#:~:text=BREAKFAST%20SANDWICH%20RECIPES-,Fried%20Egg%20Sandwich,-4.5", "15m", "4", "386", ["breakfast", "vegetarian", "under-fifteen-prep"]);

    addRecipe("Crispy Hash Browns", "'The secret to the crispiest hash browns? Remove as much moisture as possible before frying. Here's how.' - Elise Bauer", "../../images/recipes/8hashbrowns.png", "https://www.simplyrecipes.com/recipes/crispy_hash_browns/#:~:text=PRINT-,Crispy%20Hash%20Browns,-PREP%20TIME", "20m", "4", "200", ["breakfast", "dairy-free", "vegetarian"]);

    addRecipe("Mamaw's Chicken and Rice Casserole", "'I grew up with this chicken and rice casserole recipe. My Grandmother got it from a lady from church at a potluck a long time ago! She passed it down to my mom and it's always been a family favorite. Quick and easy for school nights, and the leftovers are just as good!' - katiefbenham", "../../images/recipes/9chicken-and-rice-casserole.png", "https://www.allrecipes.com/recipe/233983/mamaws-chicken-and-rice-casserole/#:~:text=Keep%20screen%20awake)-,Ingredients,-1X", "1h 20m", "6", "411", ["gluten-free"]);

    addRecipe("Sloppy Joes", "'These crowd-pleasing Sloppy Joe sandwiches will take you back to your childhood! This is my mom's recipe and it always gets compliments!' - Tamara", "../../images/recipes/10sloppy-joes.png", "https://www.allrecipes.com/recipe/24264/sloppy-joes-ii/#:~:text=Keep%20screen%20awake)-,Ingredients,-1X", "35m", "6", "243", ["dairy-free", "low-carb"]);
    
    //11-15
    addRecipe("Easy Chicken Fajitas", "'These Easy Chicken Fajitas are the perfect weeknight meal because they’re on the table in about 20 minutes start to finish!' - Holly Nilsson", "../../images/recipes/11chicken-fajitas.png", "https://www.spendwithpennies.com/easy-chicken-fajitas/#:~:text=comment%2C%20click%20here!-,Easy%20Chicken%20Fajitas,-These%20Easy%20Chicken", "30m", "4", "1032", ["dairy-free", "gluten-free"]);

    addRecipe("Easy Ground Beef Tacos", "'These Ground Beef Tacos are filled with juicy flavorful taco meat made with my homemade taco seasoning - it's an easy weeknight recipe for the whole family!' - Yumna Jawad", "../../images/recipes/12ground-beef-tacos.png", "https://feelgoodfoodie.net/recipe/ground-beef-tacos-napa-cabbage-guacamole/#wprm-recipe-container-5870:~:text=on%20my%20stories!-,Ground%20Beef%20Tacos,-These%20Ground%20Beef", "25m", "4", "142", ["dairy-free", "low-carb"]);
    
    addRecipe("Easy Black Bean Soup", "'A simple and healthy soup made with canned black beans and ingredients you probably already have in your pantry! This flavorful black bean soup is vegan, gluten-free, and vegetarian.' - Maria Lichty", "../../images/recipes/13black-bean-soup.png", "https://www.twopeasandtheirpod.com/easy-black-bean-soup/#:~:text=SOUP-,Easy%20Black%20Bean%20Soup,-Easy%20Black%20Bean", "45m", "6", "428", ["gluten-free", "vegetarian"]);

    addRecipe("Easy Chicken Stir Fry Recipe", "'This easy Chicken Stir Fry recipe is loaded with fresh veggies and the most delicious sauce made with honey, soy sauce, and toasted sesame oil! This healthy recipe takes 20 minutes to make and will wow your family with it’s amazing flavor!' - Trish", "../../images/recipes/14chicken-stir-fry.png", "https://www.momontimeout.com/easy-chicken-stir-fry-recipe/#:~:text=from%20821%20votes-,Chicken%20Stir%20Fry%20Recipe,-This%20easy%C2%A0Chicken", "18m", "4", "343", ["gluten-free"]);

    addRecipe("Stuffed Bell Peppers", "'Stuffed Bell Peppers have been a huge favorite of mine since my aunt first made them for me many many years ago. At the time it seemed like such an elaborate, fancy recipe, but who knew they were really this simple to make! It’s a classic comfort food recipe that’s hearty, filling, easy to customize, and can feed a large family.' - Marsha McDougal", "../../images/recipes/15stuffed-bell-peppers.png", "https://www.budgetbytes.com/stuffed-bell-peppers/#:~:text=SHARE%20THIS%20RECIPE-,STUFFED%20BELL%20PEPPERS,-4.59%20from%2092", "1h 5m", "6", "454", ["gluten-free"]);
    //16-20
    addRecipe("Vegetable Soup", "'This Vegetable Soup has become one of my most popular soup recipes and for good reason! It's healthy, it's comforting and 1,000 times better than what you'll get in a can! Makes 15 cups.' - Jaclyn", "../../images/recipes/16-vegetable-soup.png", "https://www.cookingclassy.com/vegetable-soup/#:~:text=PRINT%20RECIPE-,Vegetable%20Soup,-This%20Vegetable%20Soup", "55m", "8", "198", ["gluten-free", "vegetarian"]);

    addRecipe("Chicken Quesadillas", "'This really is the best chicken quesadillas recipe! So easy, these fajita-style quesadillas taste just as good, if not better, than any restaurant!' - Mel", "../../images/recipes/17-chicken-quesadilas.png", "https://www.melskitchencafe.com/the-best-chicken-quesadillas/#:~:text=Pastitsio%20%7BCasserole%2DStyle%7D-,The%20Best%20Chicken%20Quesadillas,-yield%3A%208", "30m", "8", "456", []);

    addRecipe("Chicken Pot Pie", "'This traditional Chicken Pot Pie recipe is easy to make, with a buttery, flaky pie crust and creamy chicken and vegetable filling.' - Lauren Allen", "../../images/recipes/18-chicken-pot-pie.png", "https://tastesbetterfromscratch.com/chicken-pot-pie/#:~:text=from%201022%20votes-,Chicken%20Pot%20Pie,-This%20traditional%20Chicken", "1h 30m", "8", "431", []);

    addRecipe("Fried Rice", "'Learn how to make fried rice with this classic recipe. It only takes 15 minutes to make, it’s easy to customize with your favorite add-ins, and it’s SO flavorful and delicious!' - Ali", "../../images/recipes/19-fried-rice.png", "https://www.gimmesomeoven.com/fried-rice-recipe/#:~:text=Black%20Pepper%20Chicken-,FRIED%20RICE,-5%20Stars", "15m", "4-6", "918", ["gluten-free", "vegetarian", "under-fifteen-prep"]);

    addRecipe("Vegetable Omelette", "'With just 5 minutes of prep and a good pan, this easy recipe will teach you how to make a vegetable omelette. So grab an onion, pepper, mushrooms, and cheddar cheese, and let's cook breakfast!' - Sarah Bond", "../../images/recipes/20-veggie-omelette.png", "https://www.liveeatlearn.com/how-to-make-an-omelette/#:~:text=print-,How%20To%20Make%20A%20Vegetable%20Omelette%20(Perfect%20Every%20Time!),-5%20from%2016", "15m", "1", "368", ["breakfast", "gluten-free", "low-carb", "vegetarian", "under-fifteen-prep"]);

    //21-25
    addRecipe("Grilled Cheese Sandwich", "'Learn how to make the best Grilled Cheese sandwich with a crisp, buttery exterior and gooey cheese center. It's perfect for dipping into warm tomato soup.' - Natasha Kravchuk", "../../images/recipes/21-grilled-cheese.png", "https://natashaskitchen.com/grilled-cheese-sandwich/#:~:text=Grilled%20Cheese%20Sandwich%20Recipe", "30m", "4", "499", ["vegetarian"]);

    addRecipe("Easy Egg Fried Rice", "'This egg fried rice is quick to make with instant rice. It's easy to customize with other vegetables or leftover roast meat.' - Krista B", "../../images/recipes/22-egg-fried-rice.png", "https://www.allrecipes.com/recipe/23298/egg-fried-rice/#:~:text=FRIED%20RICE%20RECIPES-,Easy%20Egg%20Fried%20Rice,-4.5", "20m", "4", "106", ["gluten-free", "low-carb", "vegetarian"]);

    addRecipe("Vegetable Quesadillas", "'My easy vegetable quesadilla recipe combines delicious spiced veggies and gooey cheese. Our easy spice mixture makes these taste amazing. Use whatever vegetable you have on hand!' - Adam & Joanne", "../../images/recipes/23-vegetable-cheese-quesadillas.png", "https://www.inspiredtaste.net/48470/vegetable-quesadillas/#:~:text=cream%20or%20crema.-,The%20Best%20Vegetable%20Quesadillas,-5.0%20(6%20reviews", "25m", "4", "313", ["vegetarian"]);

    addRecipe("Soft Chocolate Chip Cookies", "'These are THE BEST soft chocolate chip cookies! No chilling required. Just ultra thick, soft, classic chocolate chip cookies!' - Lindsay \n\n (Editor's Note: Can confirm, these are delicious!)", "../../images/recipes/24-chocolate-chip-cookies.png", "https://pinchofyum.com/the-best-soft-chocolate-chip-cookies#:~:text=the%20next%20level.-,The%20Best%20Soft%20Chocolate%20Chip%20Cookies,-5%20Stars", "20m", "12", "250", ["dessert", "vegetarian"]);

    addRecipe("Strawberry Crisp", "'This Fresh Strawberry Crisp is the best summer dessert ever! Fresh juicy strawberries are topped with a buttery and crumbly oat topping, and is absolutely swoothworthy with a big scoop of vanilla ice cream on top!' - Ashlyn", "../../images/recipes/25-strawberry-crisp.png", "https://belleofthekitchen.com/fresh-strawberry-crisp-recipe/#:~:text=Recipe%3A-,Strawberry%20Crisp%20Recipe,-yield%3A%208", "35m", "8", "387", ["dessert", "vegetarian"]);
    //26-30
    addRecipe("Instant Pot Loaded Potato Soup", "'This Instant Pot Loaded Potato Soup is creamy, delicious, and tastes like you slaved over it all day! It’s easy to prepare and is ready in a flash thanks to the Instant Pot. There’s also a slow cooker version if you’d rather prepare it that way!' - Ashlyn", "../../images/recipes/26-loaded-potato-soup.png", "https://belleofthekitchen.com/instant-pot-loaded-potato-soup/#:~:text=Recipe%3A-,Instant%20Pot%20Loaded%20Potato%20Soup,-(with%20a%20slow", "33m", "6", "481", []);

    

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
//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    setupInitialOptions();
    loadRecipes();
    loadSelectorOptions();
    selectFilter.addEventListener("change", addFilter);
    selectSort.addEventListener("change", setSortType);
    buttonClearFilters.addEventListener("click", clearFilters);
    inputSearchBar.addEventListener("change", loadRecipeDisplays);
    inputMeals.addEventListener("change", validateCalculator);
    inputPrice.addEventListener("change", validateCalculator);
});