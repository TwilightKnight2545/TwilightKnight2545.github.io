"use strict"

$(document).ready(() =>{

    //Global Variables
    let scoreArrays = [["Bylander", "Rene", "86"], ["Bangsberg", "Andy", "87"]];
    //Functions
    
    const clearInputs = () => {
        $("#first-name").val("");
        $("#last-name").val("");
        $("#score").val("");
    }
    const clearScores = () => {
        scoreArrays = [];
        clearInputs();
        displayScores();
        $("#average-display").text("Average Score: 0");
        
    }
    const displayScores = () =>{
        let totalScore = 0;
        //Clears List
        $("#output-list").val("");
        //Adds Scores From List
        scoreArrays.forEach(entry => {
            $("#output-list").val($("#output-list").val() + entry[0] + ", " + entry[1] + " - " + entry[2] + "\n");
            totalScore += parseInt(entry[2]);
        });
        $("#output-list").val($("#output-list").val().trim());
        //Average Display
        $("#average-display").text("Average Score: " + (parseFloat(totalScore) / scoreArrays.length).toFixed(2));
        $("#first-name").focus();
    }
    const sortScores = () =>{
        scoreArrays.sort(); //Sorts by the last name
        displayScores();
    }
    const validateInput = () =>{
        let isValid = true;
        //First Name
        if($("#first-name").val() == ""){
            $("#first-name").attr("class","error");
            $("#first-name").prev().attr("class","error");
            isValid = false;
        }
        else{
            $("#first-name").attr("class","");
            $("#first-name").prev().attr("class","");
        }
        //Last Name
        if($("#last-name").val() == ""){
            $("#last-name").attr("class","error");
            $("#last-name").prev().attr("class","error");
            isValid = false;
        }
        else{
            $("#last-name").attr("class","");
            $("#last-name").prev().attr("class","");
        }
        //Score
        //--Rounds number to the next highest int
        if(!isNaN($("#score").val()) && $("#score").val() != ""){
            $("#score").val(Math.ceil($("#score").val()));
        }
        let score = $("#score").val();
        if(isNaN(score) || score == "" || score < 0 || score > 100){
            $("#score").attr("class","error");
            $("#score").prev().attr("class","error");
            isValid = false;
        }
        else{
            $("#score").attr("class","");
            $("#score").prev().attr("class","");
        }
        return isValid;
    }
    //Event Listeners
    $("#add-score").on("click", ()=> {
        if(validateInput() == true){
            scoreArrays.push([$("#last-name").val(), $("#first-name").val(), $("#score").val()])
            clearInputs();
            displayScores();
        }
    });

    $("#clear").on("click", () =>{
        clearScores();
    });

    $("#sort").on("click", () =>{
        sortScores();
    });

    //On Load
    displayScores();
}); //end ready