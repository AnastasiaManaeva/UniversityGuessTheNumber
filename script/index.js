let secretNumber;
let attempts;
let maxAttempts;

// Старт игры

function handleStartGame() {
    const A = parseInt(document.getElementById('rangeA').value);
    const B = parseInt(document.getElementById('rangeB').value);
    
    if (isNaN(A) || isNaN(B) || A >= B) {
        document.getElementById('warningStart').textContent = 'Пожалуйста, введите корректные мин. и макс. значения.';
        document.getElementById('rangeA').value = '';
        document.getElementById('rangeB').value = '';
        console.log(document.getElementById('rangeA').value);
        return;
    }
    
    secretNumber = Math.floor(Math.random() * (B - A + 1)) + A;
    attempts = 0;
    maxAttempts = Math.ceil(Math.log2(B - A + 1));
    
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('startSection').style.display = 'none';
    document.getElementById('attemptsLeft').textContent = `Осталось попыток: ${maxAttempts}`;
    document.getElementById('interval').textContent = `Диапазон: от ${A} до ${B}`;
    document.getElementById('feedback').textContent = '';
    document.getElementById('userGuess').focus();
}

document.getElementById('startGame').addEventListener('click', function() {
    handleStartGame();
});

document.getElementById('rangeB').addEventListener('keydown', function(e) {
    if (e.code === 'Enter') {
        e.preventDefault();
        handleGuess();
    }
});

// Проверка введенного пользователем предположения

function handleGuess() {
    const min = parseInt(document.getElementById('rangeA').value);
    const max = parseInt(document.getElementById('rangeB').value);
    const historyDiv = document.getElementById('history');
    const userGuess = document.getElementById('userGuess');
    const userGuessValue = parseInt(userGuess.value);
    const feedback = document.getElementById('feedback');
    const attemptsLeft = document.getElementById('attemptsLeft');
    const submitGuess = document.getElementById('submitGuess');

    if (isNaN(userGuessValue)) {
        document.getElementById('warningGame').textContent = 'Пожалуйста, введите число.';
        userGuess.focus();
        return;
    } else {
        document.getElementById('warningGame').textContent = '';
    }

    attempts++;
    
    if (userGuessValue === secretNumber) {

        feedback.textContent = 'Поздравляем! Вы угадали число!';
        attemptsLeft.textContent = `Осталось попыток: ${maxAttempts - attempts}`;
        submitGuess.disabled = true;

    } else if (attempts >= maxAttempts) {

        feedback.textContent = `Вы исчерпали все попытки! Загаданное число было ${secretNumber}.`;
        attemptsLeft.textContent = `Осталось попыток: ${maxAttempts - attempts}`;
        submitGuess.disabled = true;

    } else {
        if (userGuessValue < min || userGuessValue > max) {

            attempts--;
            feedback.textContent = 'Число не входит в интервал.';
            userGuess.value = '';
            userGuess.focus();

        } else if (userGuessValue < secretNumber) {

            historyDiv.innerHTML += `<li>больше ${userGuessValue}</li>`;
            const listItems = historyDiv.getElementsByTagName('li');
            if (listItems.length === 1) {
                document.getElementById('historyDel').remove();
            }

            feedback.textContent = `Загаданное число больше ${userGuessValue}.`;
            attemptsLeft.textContent = `Осталось попыток: ${maxAttempts - attempts}`;
            userGuess.value = '';
            userGuess.focus();

        } else if (userGuessValue > secretNumber) {

            historyDiv.innerHTML += `<li>меньше ${userGuessValue}</li>`;
            const listItems = historyDiv.getElementsByTagName('li');
            if (listItems.length === 1) {
                document.getElementById('historyDel').remove();
            }

            feedback.textContent = `Загаданное число меньше ${userGuessValue}.`;
            attemptsLeft.textContent = `Осталось попыток: ${maxAttempts - attempts}`;
            document.getElementById('userGuess').value = '';
            document.getElementById('userGuess').focus();

        }
    }
}

document.getElementById('submitGuess').addEventListener('click', function() {
    handleGuess();
    this.blur();
});


document.getElementById('userGuess').addEventListener('keydown', function(e) {
    if (e.code === 'Enter') {
        e.preventDefault();
        handleGuess();
    }
});

// Начат игру заново

document.getElementById('restart').addEventListener('click', function() {
    document.getElementById('rangeA').value = '';
    document.getElementById('rangeB').value = '';
    document.getElementById('userGuess').value = '';

    document.getElementById('submitGuess').disabled = false;
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('startSection').style.display = 'block';

    const newParagraph = document.createElement('p');
    newParagraph.id = 'historyDel';
    newParagraph.className = 'text-secondary m-0 fst-italic';
    newParagraph.textContent = 'пусто';

    document.getElementById('history').innerHTML = '';
    if(!document.getElementById('historyDel')) {
        document.getElementById('history').appendChild(newParagraph);
    }
})