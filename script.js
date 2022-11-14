//variables
let currentInput = '';
let result = '';
let calcResult = '';
let currentOperator = null;
let refreshScreen = false;
let previousAction = '';
let equalsClicked = false;

const resultScreen = document.getElementById('result');
const operationScreen = document.getElementById('input');

// operators
function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    if (b == 0){
        return "GTFO";
    } else {
        return a / b;
    }
}
function equals(e){
    
}

//operate
function opButtonClick(e){
    if (currentOperator === null){
        result = currentInput;
    } 

    if (currentOperator !== null && previousAction === "num"){
        result = operate(Number(result), Number(currentInput),currentOperator);
        operationScreen.textContent =  `${result} ${currentOperator}`;
        resultScreen.textContent = result;
    }

    currentOperator = document.getElementById(e.target.id).textContent; //get by class?
    //display result and current operator
    operationScreen.textContent = `${result} ${currentOperator}`;
    currentInput = '';

    previousAction = "op";
}

function numButtonClick(e){
    const numberClicked = document.getElementById(e.target.id).textContent;
    
    currentInput += numberClicked;
    
    
    if(currentOperator === null){
        operationScreen.textContent = currentInput;

    } else if(equalsClicked === true){
        clearButtonClick()
        currentInput += numberClicked;
        operationScreen.textContent = currentInput;
    } else {
        calcResult = operate(Number(result), Number(currentInput),currentOperator);
        operationScreen.textContent =  `${result} ${currentOperator} ${currentInput}`;
        resultScreen.textContent = calcResult;
    }

    previousAction = "num";

    //   
}

function equalsButtonClick(e){
    result = operate(Number(result), Number(currentInput),currentOperator);
    operationScreen.textContent =  `${result}`;
    resultScreen.textContent = '';
    previousAction = "op";
    equalsClicked = true;
}

function clearButtonClick(){
    operationScreen.textContent =  '';
    resultScreen.textContent = '';
    currentInput = '';
    result = '';
    calcResult = '';
    currentOperator = null;  
    previousAction = '';
    equalsClicked = false;
}

function deleteButtonClick(){
    if (currentInput.length > 0){
        currentInput = currentInput.substring(0,currentInput.length-1);
        previousAction = "num";
        calcResult = operate(Number(result), Number(currentInput),currentOperator);
        operationScreen.textContent =  `${result} ${currentOperator} ${currentInput}`;
        resultScreen.textContent = calcResult; 

    } 
}

function decimalButtonClick(){
    if (!currentInput.includes(".") && previousAction === 'num'){
        currentInput += ".";
        if (result !== '') {
            operationScreen.textContent =  `${result} ${currentOperator} ${currentInput}`;
            resultScreen.textContent = calcResult;
        } else {
            operationScreen.textContent =  `${currentInput}`;
        }
    }
}

function calculate(){   
    //operate
    //display result
    const outcome = operate(Number(result), Number(currentInput),currentOperator);
    if (previousAction==="num"){
        calcResult = 1;
    } else {
        result = operate(Number(result), Number(currentInput),currentOperator);
    }
}


function operate(a,b,operator){
    let output = 0;
    switch (operator) {
        case '+':
            output = add(a,b);
            break;
        case '-':
            output = subtract(a,b);
            break;
        case '*':
            output = multiply(a,b);
            break;   
        case '/':
            output = divide(a,b);
            break;
        default:
            output = 0;
    }

    return output.toFixed(3);
}

//display
function updateCurrentInput(input){
    currentInput = input;
    updateDisplayInput(currentInput);
}

function displayInput(input){
    let currentInputDisplay = currentInput + input;
    currentInput = Number(currentInputDisplay);
    updateDisplayInput(currentInputDisplay);
}

function updateDisplayInput(){
    document.getElementById('input').textContent = Number(currentInput);
}

function updateDisplayResult(){
    document.getElementById('result').textContent = Number(result);
}

//display modifiers
function clearDisplay(){
    currentInput = 0;
    lastInput = 0;
    currentOperator = '';
    updateDisplayNumbers(current);
}

function deleteDisplay(){
    deleteInput = input.toString;
    deleteInput = deleteInput.subString(0,deleteInput.length-1);
    input = Number(deleteInput);
    updateDisplayNumbers(deleteInput);
}

function refreshDisplay(){
    currentInput = 0;
    updateDisplayInput(currentInput);
    refreshScreen = false;
}



//initialise

function initialise(){
    //mouseclick events
    const opButtons = Array.from(document.querySelectorAll('.operator-button'));
    opButtons.forEach(opButton => opButton.addEventListener('click', opButtonClick));

    const numButtons = Array.from(document.querySelectorAll('.number-button'));
    numButtons.forEach(numButton => numButton.addEventListener('click', numButtonClick));

    const eqButtons = Array.from(document.querySelectorAll('.equals-button'));
    eqButtons.forEach(eqButton => eqButton.addEventListener('click', equalsButtonClick));

    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearButtonClick);

    const deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', deleteButtonClick);

    const decimalButton = document.getElementById('.-button');
    decimalButton.addEventListener('click', decimalButtonClick);

    //keyboard events
    //window.addEventListener('keydown', parseKeydown);

    //mouseover events (darken)
}

window.onload = initialise();
