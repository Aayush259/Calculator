// Getting all input-buttons.
const InputButtons = document.querySelectorAll('.input-button, #delete-btn');

// Getting output box.
const OutputBox = document.querySelector('#output-box');

// Getting preview box.
const PreviewBox = document.getElementById('result-preview');

/*
    This function changes the theme of the app based on the type of theme passed as argument.
*/
const ChangeTheme = (themeType) => {

    const Calculator = document.getElementById('calculator');

    // For light theme.
    if (themeType === 'light') {

        document.body.style.backgroundColor = `var(--Light-gray)`;

        InputButtons.forEach(button => {
            button.style.backgroundColor = `var(--Marine-blue)`;
            button.style.color = `var(--White)`;
        });

        Calculator.style.backgroundColor = `var(--White)`;

        OutputBox.style.backgroundColor = `var(--Light-gray)`;

        OutputBox.style.color = `var(--Marine-blue)`;

    }
    // For dark theme.
    else if (themeType === 'dark') {

        document.body.style.backgroundColor = `var(--Marine-blue)`;

        InputButtons.forEach(button => {
            button.style.backgroundColor = `var(--White)`;
            button.style.color = `var(--Marine-blue)`;
        });

        Calculator.style.backgroundColor = `var(--Black)`;

        OutputBox.style.backgroundColor = `var(--White)`;

        OutputBox.style.color = `var(--Cool-gray)`;
    };
}

// Getting theme button.
const ThemeBtn = document.getElementById('theme-btn');

// Adding event listener to the theme button so that when it is clicked then it changes the theme of calculator.
ThemeBtn.addEventListener('click', () => {

    // Getting image present inside the theme button.
    let themeImage = ThemeBtn.querySelector('img');

    // Changing the image src based on current theme.
    if (themeImage.src.includes('theme2')) {
        themeImage.src = `./images/theme1.png`;
        ChangeTheme('light');
    } else {
        themeImage.src = `./images/theme2.png`;
        ChangeTheme('dark');
    }
})

// Setting initially expression and buttonText to NULL.
let expression = null;
let buttonText = null;

/*
    This function calculates the expression provided as argument and returns the answer.
*/
const Calculate = (exp) => {

    const ArrayOfOperators = [`+`, `-`, `X`, `÷`, `^`];

    // Getting first and last characters of expression.
    const ExpFirstCharacter = exp[0];
    const ExpLastCharacter = exp[exp.length - 1];

    // If the first or last character of expression is an operator then remove it from the expression.
    if (ArrayOfOperators.includes(ExpFirstCharacter)) {
        exp = exp.slice(1);
    } else if (ArrayOfOperators.includes(ExpLastCharacter)) {
        exp = exp.slice(0, -1);
    }

    // Replace the divide, multiply, exponent and pi symbol to actual symbols in javascript.
    exp = exp.replace(/÷/g, '/');
    exp = exp.replace(/X/g, '*');
    exp = exp.replace(/\^/g, '**');
    exp = exp.replace(/π/g, '3.142857142857143');
    
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
    This function display the preview of the result on screen.
*/
const PreviewResult = () => {

    // Getting expression value from OutputBox.
    expression = OutputBox.value;

    const PreviewResult = Calculate(expression);

    if (PreviewResult !== `Error`) {
        PreviewBox.innerHTML = PreviewResult;
    };

    expression = null;
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
    PreviewBox.innerHTML = '';
}

// Adding event listener to each input button using for each loop.
InputButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        // Setting buttonText to the innerText of the clicked button element.
        buttonText = button.innerText;

        // If buttonText is 'x', then remove the last character from the output box.
        if (buttonText === 'x') {
            Backspace();

            // Preview the result.
            PreviewResult();

        }   // If buttonText is '=', then calculate the expression.
        else if (buttonText === '=') {
            expression = OutputBox.value;
            const Result = Calculate(expression);
            OutputBox.value = Result;
            PreviewBox.innerHTML = '';
            expression = null;
        }   // If buttonText is 'AC' then clear the output box.
        else if (buttonText === 'AC') {
            Clear();
        }   // If buttonText is 'x2' then raised to the power 2.
        else if (buttonText === 'x2') {
            OutputBox.value += '^2';

            // Preview the result.
            PreviewResult();
        }
        else {
            OutputBox.value += buttonText;

            // Preview the result.
            PreviewResult();
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