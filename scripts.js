let firstNumber = 0;
let secondNumber = 0;
let action = '+';
let answer = 0;

let input = document.getElementById('calc-input');
let calculationSpan = document.getElementById('calculation');

let history = [];

function onNumberClick(number) {
    input.value += number;
}

function onActionClick(clickedAction) {
    input.value += ' ' + clickedAction + ' ';
    action = clickedAction;
}

function onCountClick() {
    let sanitizedInput = input.value.replace(/,/g, '.');
    let splitted = sanitizedInput.split(' ');
    firstNumber = parseFloat(splitted[0]);
    action = splitted[1];
    secondNumber = parseFloat(splitted[2]);

    calculateAnswer();
    input.value = answer.toString().replace('.', ',');

    calculationSpan.innerText = `${firstNumber.toString().replace('.', ',')} ${action} ${secondNumber.toString().replace('.', ',')}`;

    addToHistory();
}

function calculateAnswer() {
    switch (action) {
        case '+': answer = firstNumber + secondNumber; break;
        case '-': answer = firstNumber - secondNumber; break;
        case 'x': answer = firstNumber * secondNumber; break;
        case '/': 
            if (secondNumber === 0) {
                alert("Dalyba iš 0 yra negalima!");
                return;
            }
            answer = firstNumber / secondNumber; 
            break;
    }
}

function onCleanClick() {
    firstNumber = 0;
    secondNumber = 0;
    action = '+';
    answer = 0;
    input.value = '';
    calculationSpan.innerText = '';
}

function addToHistory() {
    let historyItem = {
        firstNumber: firstNumber.toString().replace('.', ','),
        action,
        secondNumber: secondNumber.toString().replace('.', ','),
        answer: answer.toString().replace('.', ',')
    };
    
    history.push(historyItem);

    if (history.length > 5) {
        history.shift();
    }
}

document.getElementById('show-history').onclick = function() {
    let formatted = history.map(x => `<p>${x.firstNumber} ${x.action} ${x.secondNumber} = ${x.answer}</p>`);
    let historyBlock = document.querySelector('.calculator .history-items');
    historyBlock.innerHTML = formatted.join('');
}

document.getElementById('clear-history').onclick = function() {
    history = [];
    let historyBlock = document.querySelector('.calculator .history-items');
    historyBlock.innerHTML = '';
};