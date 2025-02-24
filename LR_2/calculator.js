// файл calculator.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    // кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (a !== '') {
                a = (-parseFloat(a)).toString()
                outputElement.innerHTML = a
            }
        } else {
            if (b !== '') {
                b = (-parseFloat(b)).toString()
                outputElement.innerHTML = b
            }
        }
    }
    // кнопка процент
    document.getElementById("btn_op_percent").onclick = function() { 
        if (!selectedOperation) {
            // Если операция ещё не выбрана, считаем процент от 100
            if (a !== '') {
                a = (parseFloat(a) / 100).toString()
                outputElement.innerHTML = a
            }
        } else {
            // Если операция выбрана, считаем b как процент от a
            if (b !== '') {
                b = ((parseFloat(a) * parseFloat(b)) / 100).toString()
                outputElement.innerHTML = b
            }
        }
    }
    // кнопка корень
    document.getElementById("btn_op_sqrt").onclick = function() { 
        if (!selectedOperation) {
            // Если операция ещё не выбрана, вычисляем корень из 'a'
            if (a !== '') {
                const numA = parseFloat(a)
                if (numA >= 0) {
                    a = Math.sqrt(numA).toString()
                    outputElement.innerHTML = a
                } else {
                    outputElement.innerHTML = 'Ошибка'
                }
            }
        } else {
            // Если операция выбрана, вычисляем корень из 'b'
            if (b !== '') {
                const numB = parseFloat(b)
                if (numB >= 0) {
                    b = Math.sqrt(numB).toString()
                    outputElement.innerHTML = b
                } else {
                    outputElement.innerHTML = 'Ошибка'
                }
            }
        }
    }
    // кнопка квадрат
    document.getElementById("btn_op_square").onclick = function() { 
        if (!selectedOperation) {
            // Если операция ещё не выбрана, возводим 'a' в квадрат
            if (a !== '') {
                const numA = parseFloat(a)
                a = (numA * numA).toString()
                outputElement.innerHTML = a
            }
        } else {
            // Если операция выбрана, возводим 'b' в квадрат
            if (b !== '') {
                const numB = parseFloat(b)
                b = (numB * numB).toString()
                outputElement.innerHTML = b
            }
        }
    }
    // кнопка факториал
    document.getElementById("btn_op_factorial").onclick = function() { 
        function factorial(n) {
            if (n === 0 || n === 1) return 1
            let result = 1
            for (let i = 2; i <= n; i++) {
                result *= i
            }
            return result
        }
    
        if (!selectedOperation) {
            if (a !== '') {
                const numA = parseFloat(a)
                if (numA >= 0 && Number.isInteger(numA)) {
                    a = factorial(numA).toString()
                    outputElement.innerHTML = a
                } else {
                    outputElement.innerHTML = 'Ошибка'
                }
            }
        } else {
            if (b !== '') {
                const numB = parseFloat(b)
                if (numB >= 0 && Number.isInteger(numB)) {
                    b = factorial(numB).toString()
                    outputElement.innerHTML = b
                } else {
                    outputElement.innerHTML = 'Ошибка'
                }
            }
        }
    }
    // кнопка backspase
    document.getElementById("btn_op_backspace").onclick = function() { 
        if (!selectedOperation) {
            if (a !== '') {
                a = a.slice(0, -1) // Удаляем последний символ
                outputElement.innerHTML = a === '' ? '0' : a
            }
        } else {
            if (b !== '') {
                b = b.slice(0, -1)
                outputElement.innerHTML = b === '' ? '0' : b
            }
        }
    }
    };