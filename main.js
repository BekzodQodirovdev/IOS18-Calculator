let hasDecimal = false;
let hasOperator = false;
let isErrorOrInfinity = false;
let isClearMode = false;

function appendToDisplay(value) {
    const display = document.getElementById('display');

    if (isErrorOrInfinity) {
        clearDisplay();
        isErrorOrInfinity = false
    }
    if (display.value.length >= 0) {
        toggleClearButton(true);
    }


    if (value === ',' || value === '.') {
        if (hasDecimal) {
            return; 
        }
        hasDecimal = true;
        hasOperator = false;
        value = '.';
    }

    if (value === '+' || value === '-' || value === 'x' || value === '%' || value === "÷") {
        if (hasOperator) {
            return;
        }
        hasOperator = true;  
        hasDecimal = false;
    } else {
        hasOperator = false;
    }

    
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    const display2 = document.getElementById('display2')
    
    if (isClearMode) {

        display.value = display.value.slice(0, -1);

        if (display.value === '') {
            toggleClearButton(false); 
        }
    } else {
        display.value = ''; 
        display2.value = ''; 
        toggleClearButton(false);
    }
    hasDecimal = false;
    hasOperator = false;
    isErrorOrInfinity = false;
}

function calculate() {
    const display = document.getElementById('display');
    const display2 = document.getElementById('display2')
    display2.value = display.value
    try {
        if (display.value === 'Error') {
            return;
        }

        display.value = eval(display.value.replace('÷', '/').replace('x', '*'));

        if (display.value === 'Infinity' || display.value === '-Infinity') {
            isErrorOrInfinity = true;
        }
        hasDecimal = false;
        hasOperator = false;
        toggleClearButton(false);
    } catch (e) {
        display.value = 'Error';
        isErrorOrInfinity = true
    }
}


function toggleSign() {
    const display = document.getElementById('display');
    
    if (display.value) {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.substring(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

function toggleClearButton(isClear) {
    const clearButton = document.getElementById('clearButton');
    if (isClear) {
        clearButton.innerText = 'C';
        isClearMode = true;
    } else {
        clearButton.innerText = 'AC';
        isClearMode = false;
    }
}