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
        "Life can be hard, but the fact that you're still here means you're winning!",
        "You are worth it!",
        "Studies show that people who smile often are also likely grin!", //15
        "Knock Knock! Who's there? House! House who? House about we have some fun today!",
        "Every day is a chance to improve!",
        "You are enough!",
        "Drink some water...please?",
        "Would you like to hear a bread pun? It's the <i>yeast</i> I can do!"//20
        
    ];
    let randomNumber = Math.floor(Math.random() * messageArray.length); //0-9
    // randomNumber = 20; //Manual Overide
    pFooterMessage.innerHTML = messageArray[randomNumber];
}
//Document Element
const pFooterMessage = document.querySelector("#random_message");
//Event Listener
document.addEventListener("DOMContentLoaded", () =>{
    displayMessage();
})