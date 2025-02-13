"use strict";
let inches = 0;
do{
    inches = parseFloat(prompt("Please enter length in inches: \n(Enter 999 to quit)", 999)).toFixed(2);
    if(!isNaN(inches) && inches > 0){
        if(inches != 999){
            const centimeters = inches * 2.54;
            const result = `<p>${inches} inches = ${centimeters.toFixed(2)} cm</p>`;
            document.write(result);
        }
        else{
            document.write(`<p id=bye>Goodbye!</p>`);
        }
    }
    else{
        alert("Your Number is Out of Range. Please enter a positive number.");
    }
    
} while(inches != 999.00)