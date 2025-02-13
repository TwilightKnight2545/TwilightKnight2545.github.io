"use strict";
let percent = 0;
do{
    percent = parseFloat(prompt("Please enter a grade 0-100: \n(Enter 999 to quit)", 999)).toFixed(0);
    if(!isNaN(percent) && percent >= 0 && percent <= 100){
        let letter = "_";
            if(percent >= 93){
                letter = "A";
            }
            else if(percent >= 85){
                letter = "B";
            }
            else if(percent >= 78){
                letter = "C";
            }
            else if(percent >= 70){
                letter = "D";
            }
            else{
                letter ="F";
            }
            
            const result = `<p>A grade of ${percent} is equavilant to a(n): ${letter}</p>`;
            document.write(result);
        }
    else if(percent == 999){
        document.write(`<p id=bye>Goodbye!</p>`);
    }
    else{
        alert("Your Number is Out of Range. Please enter a positive number.")
    }
    
} while(percent != 999)