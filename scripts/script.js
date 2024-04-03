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
        const Result = eval(exp);

        if (Result === 'undefined' || Result === 'NaN') {
            return `Error`;
        } else {
            return Result;
        }
    } catch {
        // Return error if there is error in the expression.
        return `Error`;
    }
}

/*
    This function removes the last character from the output box.
*/
const Backspace = () => {
    OutputBox.value = OutputBox.value.slice(0, -1);
}

/*
    This function clears the ouput box.
*/
const Clear = () => {
    OutputBox.value = '';
}

// Adding event listener to each input button using for each loop.
InputButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        // Setting buttonText to the innerText of the clicked button element.
        buttonText = button.innerText;

        // If buttonText is 'x', then remove the last character from the output box.
        if (buttonText === 'x') {
            Backspace();
        }   // If buttonText is '=', then calculate the expression.
        else if (buttonText === '=') {
            expression = OutputBox.value;
            const Result = Calculate(expression);
            OutputBox.value = Result;
            expression = null;
        }   // If buttonText is 'AC' then clear the output box.
        else if (buttonText === 'AC') {
            Clear();
        }   // If buttonText is 'x2' then raised to the power 2.
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

// Declaring empyt keys object.
let keys = {};

// Adding event listener to the body to add the keyboard functionality to the calculator.
document.body.addEventListener('keydown', (e) => {
    
    // Varuable which stores the name of the key which is pressed.
    const PressedKey = e.key;

    // Array of numbers.
    const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    keys[e.key] = true;
    if (keys['Shift'] && keys['+']) {
        OutputBox.value += '+';
    }
    else if (keys['Shift'] && keys['^']) {
        OutputBox.value += '^';
    }
    else if (keys['Shift'] && keys['*']) {
        OutputBox.value += '*';
    }

    if (PressedKey === 'Enter') {
        expression = OutputBox.value;
        const Result = Calculate(expression);
        OutputBox.value = Result;
        expression = null;
    }
    else if (PressedKey === 'Backspace') {
        Backspace();
    }
    else if (PressedKey in Numbers) {
        OutputBox.value += PressedKey;
    }
    else if (PressedKey === 'Delete') {
        Clear();
    }
})