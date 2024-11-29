let secretNumber;
let attempts;
let maxAttempts;

// document.getElementById('rangeA').addEventListener('input', function() {
//     this.value = this.value.replace(/^-?[^0-9]/g, '');
// });

// document.getElementById('rangeB').addEventListener('input', function() {
//     this.value = this.value.replace(/^-?[^0-9]/g, '');
// });

// фиксированная ширина и кнопка заново, фокус у инпута игры после нажатия начать игру

document.getElementById('startGame').addEventListener('click', function() {
    const A = parseInt(document.getElementById('rangeA').value);
    const B = parseInt(document.getElementById('rangeB').value);

    if (isNaN(A) || isNaN(B) || A >= B) {
        document.getElementById('warningStart').textContent = 'Пожалуйста, введите корректные мин. и макс. значения.';
        return;
    }

    secretNumber = Math.floor(Math.random() * (B - A + 1)) + A;
    attempts = 0;
    maxAttempts = Math.ceil(Math.log2(B - A + 1));

    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('startSection').style.display = 'none';
    document.getElementById('feedback').textContent = '';
    document.getElementById('attemptsLeft').textContent = `Осталось попыток: ${maxAttempts}`;
    document.getElementById('interval').textContent = `Диапазон: от ${A} до ${B}`;
    document.getElementById('userGuess').focus();
});

document.getElementById('submitGuess').addEventListener('click', function() {

    const min = parseInt(document.getElementById('rangeA').value);
    const max = parseInt(document.getElementById('rangeB').value);

    const userGuess = parseInt(document.getElementById('userGuess').value);
    const historyDiv = document.getElementById('history');

    if (isNaN(userGuess)) {
        document.getElementById('warningGame').textContent = 'Пожалуйста, введите число.';
        return;
    } else {
        document.getElementById('warningGame').textContent = '';
    }

    attempts++;
    
    if (userGuess === secretNumber) {
        document.getElementById('feedback').textContent = 'Поздравляем! Вы угадали число!';
        document.getElementById('submitGuess').disabled = true;
        document.getElementById('attemptsLeft').textContent = `Осталось попыток: ${maxAttempts - attempts}`;
    } else if (attempts >= maxAttempts) {
        document.getElementById('feedback').textContent = `Вы исчерпали все попытки! Загаданное число было ${secretNumber}.`;
        document.getElementById('submitGuess').disabled = true;
        document.getElementById('attemptsLeft').textContent = `Осталось попыток: ${maxAttempts - attempts}`;
    } else {
        if (userGuess < min || userGuess > max) {
            attempts--;
            document.getElementById('feedback').textContent = 'Ваше предположение не входит в заданный интервал возможных значений.';
            document.getElementById('userGuess').value = '';
            document.getElementById('userGuess').focus();
        } else if (userGuess < secretNumber) {
            historyDiv.innerHTML += `<li>больше ${userGuess}</li>`;
            const listItems = historyDiv.getElementsByTagName('li');
            if (listItems.length === 1) {
                document.getElementById('historyDel').remove();
            }
            document.getElementById('feedback').textContent = `Загаданное число больше ${userGuess}.`;
            document.getElementById('userGuess').value = '';
            document.getElementById('userGuess').focus();
            document.getElementById('attemptsLeft').textContent = `Осталось попыток: ${maxAttempts - attempts}`;
        } else if (userGuess > secretNumber) {
            historyDiv.innerHTML += `<li>меньше ${userGuess}</li>`;
            const listItems = historyDiv.getElementsByTagName('li');
            if (listItems.length === 1) {
                document.getElementById('historyDel').remove();
            }
            document.getElementById('feedback').textContent = `Загаданное число меньше ${userGuess}.`;
            document.getElementById('userGuess').value = '';
            document.getElementById('userGuess').focus();
            document.getElementById('attemptsLeft').textContent = `Осталось попыток: ${maxAttempts - attempts}`;
        }
    }
});

document.getElementById('restart').addEventListener('click', function() {
    document.getElementById('rangeA').value = '';
    document.getElementById('rangeB').value = '';
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('startSection').style.display = 'block';
    const newParagraph = document.createElement('p');
    newParagraph.id = 'historyDel';
    newParagraph.className = 'text-secondary m-0 fst-italic';
    newParagraph.textContent = 'пусто';
    document.getElementById('history').innerHTML = '';
    document.getElementById('history').appendChild(newParagraph);
})
