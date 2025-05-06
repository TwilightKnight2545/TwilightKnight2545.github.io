"use strict"
const getElement = (selector) => document.querySelector(selector);
//Global Variable
let runningTotal = 0.0;
//Helper Function
const loadMenuItem = (name, price, imageLink) =>{
    //Create Div
    const menuItem = document.createElement("div")
    menuItem.id = name;
    menuItem.setAttribute("class", "menu-pictures");
    menuItem.setAttribute("style", "background-image: url(" + imageLink + ");")
    //Create Text Elements
    const itemName = document.createElement("p");
    itemName.innerText = name;
    const itemPrice = document.createElement("p");
    itemPrice.innerText = new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(price); //Uses price
    //Append Items
    menuItem.appendChild(itemName);
    menuItem.appendChild(itemPrice);
    //Append Event Listener
    menuItem.addEventListener("click", function() {
        orderItem(name, price);
    })
    //Append MenuItem
    divMenu.appendChild(menuItem);
    
}
//Functions
const loadMenuItems = () =>{
    // This code is now easily scalable. A new item can be added to the menu simply by adding a picture to the images file, and entering the data into menu.json
    getJSONDocument().then(data=>{
        data.forEach(item => {
            loadMenuItem(item.item, item.price, item.image);
        });
    }).catch(err => console.error(err))
}
const orderItem = (name, price) =>{
    runningTotal += parseFloat(price);
    //Update Subtotal Display
    subtotal.innerText = "~ " + new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(runningTotal) + " ~"
    subtotal.setAttribute("class", "visible");
    //Update Message
    document.querySelector("#instructions").setAttribute("class", "")
    document.querySelector("#instructions").innerText = "Click on an item to add it to your order!";
    //Add Option to Select
    price = new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(price) //Formats the price for currency
    const orderItem = document.createElement("option")
    const orderDetails = document.createTextNode(name + " - " + price)
    orderItem.appendChild(orderDetails);
    
    selectOrder.appendChild(orderItem);
}
//Buttons
const reset = () =>{
    subtotal.setAttribute("class", "");
    document.querySelector("#instructions").setAttribute("class", "");
    document.querySelector("#instructions").innerText = "Click on an item to add it to your order!";
    runningTotal = 0.0;
    selectOrder.replaceChildren();
}
const placeOrder = (event) =>{
    if(runningTotal != 0){
        sessionStorage.setItem("subtotal", runningTotal);
    }
    else{
        event.preventDefault();
        document.querySelector("#instructions").setAttribute("class", "error")
        document.querySelector("#instructions").innerText = "Please select at least one item!";
    }
}

//Form Elements
const divMenu = getElement("#menu")
const buttonPlaceOrder = getElement("#submit");
const buttonResetOrder = getElement("#reset");
const selectOrder = getElement("#current-order");
const displayPrice = getElement("#subtotal");
//Get JSON Document
const getJSONDocument = async () =>{
    const response = await fetch("data/menu.json");
    const data = await response.json();
    return data
}
//Event Listeners
document.addEventListener("DOMContentLoaded", ()=>{
    loadMenuItems();
    buttonResetOrder.addEventListener("click", reset);
    buttonPlaceOrder.addEventListener("click", function(event){
        placeOrder(event);
    })
})