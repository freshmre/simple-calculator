function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
// operator is a string '+', '-', '*' or '/'
function operate(operator, a, b) {
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break
        case '-':
            result = subtract(a, b);
            break
        case '*':
            result = multiply(a, b);
            break
        case '/':
            result = divide(a, b);
            break
        default:
            throw 'Invalid operator!';
    }
    return result
}

// console.log(operate('+', 10, 20));
// console.log(operate('-', 10, 20));
// console.log(operate('*', 10, 20));
// console.log(operate('/', 10, 20));
//  console.log(operate('invalid', 10, 20));

function displayInHistory(a, b, op) {
    value = String(a) + ' ' + op + ' ' + String(b);
    historyDisplay.textContent = value;
}

function displayInResult(val) {
    resultDisplay.textContent = String(val);
}

const btns = document.querySelectorAll('.btn');
const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('history');
let displayValue = "";

btns.forEach(btn => {
    btn.style.gridArea = btn.id;
    btn.addEventListener('click', e => refreshDisplay(e.target.textContent));
});

displayInHistory(10, 20, '+')
displayInResult(30);