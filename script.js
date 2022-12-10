let previousOperand = "";
let currentOperand = "";
let operator = "";

window.addEventListener('keydown', handleKeydown)

const previousOperandDisplay = document.querySelector('.previous-operand');
const currentOperandDisplay = document.querySelector('.current-operand');

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (currentOperand != "" && previousOperand != "") {
        calculate();
    }
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    addDecimal();
});

const numberButtons = document.querySelectorAll('#number');

const operators = document.querySelectorAll('#operation');

const clearAll = document.querySelector('#all-clear')
clearAll.addEventListener('click', function () {
    previousOperand = "";
    previousOperandDisplay.textContent = "";
    currentOperand = "";
    currentOperandDisplay.textContent = "0";
    operator = "";
});

const backSpace = document.querySelector('#delete');
backSpace.addEventListener('click', function () {
    
});

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousOperand !== "" && currentOperand !== "" && operator === ""){
        previousOperand = "";
        currentOperandDisplay.textContent = currentOperand;
    }
    if (currentOperand.length <= 10){
        currentOperand += number;
        currentOperandDisplay.textContent = currentOperand;
    }
}

operators.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousOperand === "") {
        previousOperand = currentOperand;
        opCheck(op);
    } else if (currentOperand === "") {
        opCheck(op);
    } else {
        calculate();
        operator = op;
        currentOperandDisplay.textContent = "0";
        previousOperandDisplay.textContent = previousOperand + " " + operator;
    }
}

function opCheck (text) {
    operator = text;
    previousOperandDisplay.textContent = previousOperand + " " + operator;
    currentOperandDisplay.textContent = "0";
    currentOperand = "";
}

function calculate () {
    previousOperand = Number(previousOperand);
    currentOperand = Number(currentOperand);
    
    if (operator === '+') {
        previousOperand += currentOperand;
    } else if (operator === '-') {
        previousOperand -= currentOperand;
    } else if (operator === 'x') {
        previousOperand *= currentOperand;
    } else if (operator === '/') {
        if (currentOperand <= 0) {
            previousOperand = "Really?";
            displayResult();
            return;
        }
        previousOperand /= currentOperand;
    }
    previousOperand = rounding(previousOperand);
    previousOperand = previousOperand.toString();
    displayResult();
}

function rounding (num) {
    return Math.round(num * 100000) / 100000
}

function displayResult () {
    if (previousOperand.length <= 11) {
        currentOperandDisplay.textContent = previousOperand;
    } else {
        currentOperandDisplay.textContent = previousOperand.slice(0,11) + "...";
    }
    previousOperandDisplay.textContent = "";
    operator = "";
    currentOperand = "";
}

function addDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand += ".";
        currentOperandDisplay.textContent = currentOperand;
    }
}

function handleKeydown (e) {
    e.preventDefault()
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key)
    }
    if (
        e.key === "Enter" || 
        (e.key === "=" && currentOperand != "" && previousOperand != "")
    ) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key)
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }

}

function handleDelete () {
    if (currentOperand != "") {
        currentOperand = currentOperand.slice(0, -1);
        currentOperandDisplay.textContent = currentOperand;
        if (currentOperand === "") {
            currentOperandDisplay.textContent = "0"
        }
    }
    if (currentOperand === "" && previousOperand !== "" && operaqtor === "") {
        previousOperand = previousOperand.slice(0, -1);
        currentOperandDisplay.textContent = previousOperand;
    }
}