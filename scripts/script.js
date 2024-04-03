// Getting all input-buttons.
const InputButtons = document.querySelectorAll('.input-button, #delete-btn');

// Getting output box.
const OutputBox = document.querySelector('#output-box');

// Setting initially expression and buttonText to NULL.
let expression = null;
let buttonText = null;

/*
    This function calculates the expression provided as argument and returns the answer.
*/
const Calculate = (exp) => {

    // Replace the divide, multiply, exponent and pi symbol to actual symbols in javascript.
    exp = exp.replace(/÷/g, '/');
    exp = exp.replace(/X/g, '*');
    exp = exp.replace(/\^/g, '**');
    exp = exp.replace(/π/g, '3.142857142857143');

    console.log(exp);
    
    try {
        // Return the calculated result if there is no error in the expression.
        return eval(exp);
    } catch {
        // Return error if there is error in the expression.
        return `Error`;
    }
}

// Adding event listener to each input button using for each loop.
InputButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        // Setting buttonText to the innerText of the clicked button element.
        buttonText = button.innerText;

        // If buttonText is 'x', then remove the last character from the output box.
        if (buttonText === 'x') {
            OutputBox.value = OutputBox.value.slice(0, -1);
        }   // If buttonText is '=', then calculate the expression.
        else if (buttonText === '=') {
            expression = OutputBox.value;
            const Result = Calculate(expression);
            OutputBox.value = Result;
            expression = null;
        }
        else if (buttonText === 'AC') {
            OutputBox.value = '';
        }
        else if (buttonText === 'x2') {
            OutputBox.value += '^2';
        }
        else {
            OutputBox.value += buttonText;
        }

        // Again setting the buttonText to null.
        buttonText = null;
    })
})