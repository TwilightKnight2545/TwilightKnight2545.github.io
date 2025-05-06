"use strict"

document.addEventListener("DOMContentLoaded", ()=>{
    const total = new Intl.NumberFormat("en-US", {style:'currency', currency: "USD"}).format(sessionStorage.subtotal)
    document.querySelector("#total").innerHTML = "Your total is: " + total;
})