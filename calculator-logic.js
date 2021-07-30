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

// function displayInHistory(a, b, op) {
//     value = String(a) + ' ' + op + ' ' + String(b);
//     historyDisplay.textContent = value;
// }

function displayInResult(val) {
    resultDisplay.textContent = String(val);
}

function initializeVariables() {
    memory = 0;
    screen = 0;
    op = '+';
    clearScreenNext = 0;
    clearAllNext = 0;
    first = 1;
}

function calculate(key) {
    keyClasses = key.classList;
    keyStroke = key.textContent;
    // console.log(keyClasses)
    if (keyStroke == '←') {
        screen = deleteDigit(screen);
    }
    if (keyStroke == 'AC') {
        initializeVariables();
    }
    else if (keyClasses.contains('numkey')) {
        if (clearScreenNext) {
            screen = 0;
            clearScreenNext = 0;
        }
        if (clearAllNext) initializeVariables();
        screen = addDigit(keyStroke, screen);
    } else if (keyStroke === '=') {
        switch (op) {
            case '÷':
                op = '/';
                break;
            case '×':
                op = '*';
                break;
        }
        screen = operate(op, +memory, +screen);
        clearAllNext = 1;
    } else if (keyClasses.contains('operatorkey')) {
        op = keyStroke;
        if (!first) {
            switch (op) {
                case '÷':
                    op = '/';
                    break;
                case '×':
                    op = '*';
                    break;
            }
            screen = operate(op, +memory, +screen);
        }
        memory = screen;
        clearScreenNext = 1;
        first = 0;
    }
    screen = formatOutput(screen);
    displayInResult(screen);
}

function formatOutput(value) {
    if (value === Infinity) {
        clearAllNext = 1;
        return 'Err'
    }
    let zeroRegex = /^(-?)0*(0.*|\d.*)/;
    let match = zeroRegex.exec(value);
    // console.log(match);
    match = match[1] + match[2];
    value = String(match).substring(0, 13);
    return value;
}

function addDigit(stroke, num) {
    let returnVal;
    num = String(num);
    console.log(num)
    if (num === '0') {
        if (stroke == '.') {
            returnVal = '0.';
        } else {
            returnVal = stroke;
        }
    } else if (stroke === '.') {
        if (!num.includes('.')) {
            returnVal = num + '.';
        }
    } else {
        returnVal = num + stroke;
    }
    return formatOutput(returnVal);
}

function deleteDigit(n) {
    n = String(n);
    if (n.length == 1) {
        return 0;
    }
    else {
        return n.substring(0, n.length - 1);
    }
}

function mapKeyboardStrokes(e) {
    code = e.code;
    // console.log(code);
    // console.log(e); e.shiftKey
    switch (code) {
        case 'Numpad1':
        case 'Digit1':
            document.getElementById('b1').click();
            break;

        case 'Numpad2':
        case 'Digit2':
            document.getElementById('b2').click();
            break;

        case 'Numpad3':
        case 'Digit3':
            document.getElementById('b3').click();
            break;

        case 'Numpad4':
        case 'Digit4':
            document.getElementById('b4').click();
            break;

        case 'Numpad5':
        case 'Digit5':
            document.getElementById('b5').click();
            break;

        case 'Numpad6':
        case 'Digit6':
            document.getElementById('b6').click();
            break;

        case 'Numpad7':
        case 'Digit7':
            document.getElementById('b7').click();
            break;

        case 'Numpad8':
        case 'Digit8':
            if (code === 'Numpad8' || code === 'Digit8' && !e.shiftKey) {
                document.getElementById('b8').click();
            }
            break;

        case 'Numpad9':
        case 'Digit9':
            document.getElementById('b9').click();
            break;

        case 'NumpadAdd':
        case 'Equal':
            if (code === 'NumpadAdd' || code === 'Equal' && e.shiftKey) {
                document.getElementById('plus').click();
            }
            break;

        case 'NumpadSubtract':
        case 'Minus':
            if (code === 'NumpadSubtract' || code === 'Minus' && !e.shiftKey) {
                document.getElementById('minus').click();
            }
            break;

        case 'NumpadMultiply':
        case 'Digit8':
            document.getElementById('mult').click();
            break;

        case 'NumpadDivide':
        case 'Slash':
            document.getElementById('division').click();
            break;

        case 'NumpadEnter':
        case 'Enter':
            document.getElementById('equals').click();
            break;
    }
}

const btns = document.getElementById('controls').querySelectorAll('button');
const resultDisplay = document.getElementById('result');
// const historyDisplay = document.getElementById('history');

let memory;
let screen;
let op;
let clearScreenNext;
let clearAllNext;

initializeVariables();

btns.forEach(btn => {
    btn.style.gridArea = btn.id;
    btn.addEventListener('click', e => calculate(e.target));
});

document.addEventListener('keydown', e => mapKeyboardStrokes(e));

// displayInHistory('10', '20', '+')
displayInResult(0);

