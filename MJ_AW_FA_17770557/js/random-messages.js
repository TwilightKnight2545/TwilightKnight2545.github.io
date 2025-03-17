"use strict"

//Functions
const displayMessage = () =>{
    const messageArray = [
        "I hope you're having a wonderful day!",//0
        "I wish you well in all your endeavors!",
        "You are allowed to be happy!",
        "It's okay to ask for help!",
        "Today would not be the same without you!",
        "Give your friends a hug, you both deserve it!", //5
        "- .... . / ..-. .- -.-. - / - .... .- - / -.-- --- ..- / -.-. .- -. / .-. . .- -.. / - .... .. ... / -- .- -.- . ... / -.-- --- ..- / .--. .-. . - - -.-- / -.-. --- --- .-.. -.-.--",
        "Human Rights for All!",
        "Love is Love!",
        "Eat the rich...and donuts!",
        "It's a scientific fact that 100% of people who read this are amazing!", //10
        ":)",
        "🏳️‍🌈🏳️‍⚧️🏳️‍🌈🏳️‍⚧️🏳️‍🌈🏳️‍⚧️🏳️‍🌈🏳️‍⚧️🏳️‍🌈",
        "Life can be hard, but the fact that you're here means you're winning!",
        "You are worth it!",
        "Studies show that people who smile often are also likely grin!", //15
        "Knock Knock! (p.1)",
        "Who's There? (p.2)",
        "House! (p.3)",
        "House Who? (p.4)",
        "House About We Have Some Fun Today! (p.5)", //20
        "Every day is a chance to improve!",
        "You are enough!",
        "Drink some water...please?"
        
    ];
    let randomNumber = Math.floor(Math.random() * messageArray.length); //0-9
    pFooterMessage.innerText = messageArray[randomNumber];
}
//Document Element
const pFooterMessage = document.querySelector("#random_message");
//Event Listener
document.addEventListener("DOMContentLoaded", () =>{
    displayMessage();
})