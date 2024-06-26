const reset_event = document.querySelector("[data-reset_event]")
const backspace_event = document.querySelector("[data-backspace_event]")
const switchinteger_event = document.querySelector("[data-switchinteger_event]")
const equal_event = document.querySelector("[data-equal_event]")

const sign_events = document.querySelectorAll("[data-sign_event]")
const number_events = document.querySelectorAll("[data-number_event]")
const percent_event = document.querySelector("[data-percent_event]")

const lcd_big = document.querySelector("[data-lcd_big]")
const lcd_small = document.querySelector("[data-lcd_small]")

let c_answer = 0
let c_text_expression = ""
// let f_previous = null
// let c_zero = false
let c_period = false
// let c_backspace = false

showExprLarge(0)
reset_event.addEventListener("click", () => {
    c_period = false
    
    resetExpression()
    showExprLarge(c_text_expression)
    playCountDown()
})
backspace_event.addEventListener("click", () => {
    if (isPeriod(lastCharacter(c_text_expression))) c_period = false
    if (isOperator(lastCharacter(c_text_expression))) {
        if (lastCharacter(backSpace().split(/[\+\-\x÷]/)).includes(".")) c_period = false
        showExprLarge(c_text_expression)
        
        c_answer = processEquation(c_text_expression).toString()
        showExprSmall(c_answer)
    }
    
    else {
        backSpace()
        showExprLarge(c_text_expression)

        c_answer = processEquation(c_text_expression).toString()
        showExprSmall(c_answer)
    }
    playCountDown()
})
sign_events.forEach(sign_event => {
    sign_event.addEventListener("click", (sign) => {
        operatorLogic(sign.target.textContent)

        c_answer = processEquation(c_text_expression).toString()
        showExprSmall(c_answer)
        playCountDown()
    })
})
number_events.forEach(number_event => {
    number_event.addEventListener("click", (number) => {
        numberLogic(number.target.textContent)

        c_answer = processEquation(c_text_expression).toString()
        showExprSmall(c_answer)
        playCountDown()
    })
})
percent_event.addEventListener("click", (percent) => {
    percentLogic(percent.target.textContent)

    c_answer = processEquation(c_text_expression).toString()
    showExprSmall(c_answer)
    playCountDown()
})
equal_event.addEventListener("click", () => {

    add_hlist(`${c_text_expression} = ${c_answer}`)
    c_text_expression = c_answer
    
    showExprLarge(c_answer)
    showExprSmall("")
    
    c_period = false
    playCorrect()
})

// fuck this i don't have DSA knowledge imma use math.js
function processEquation(expression) {
    expression = expression.toString()
    expression = expression.replace(/x/g, '*').replace(/÷/g, '/')
    const percentRegex = /(\d+(?:\.\d+)?)%/g
    let match
    while ((match = percentRegex.exec(expression)) !== null) {
        const percentValue = parseFloat(match[1]) / 100
        expression = expression.replace(match[0], percentValue)
    }
    return math.evaluate(expression.toString())
}

  


function percentLogic(percent) {
    if (
        isNumber(lastCharacter(c_text_expression)) || 
        isPeriod(lastCharacter(c_text_expression))
    ) updateExpression(percent) 
}

function numberLogic(value) {
    if (isPeriod(value) && !isPercent(lastCharacter(c_text_expression))) {
        if (c_period) return

        c_period = true
        updateExpression(value)
    }

    else if(
        // checks if last value was: number, operator, period, empty
        isNumber(lastCharacter(c_text_expression)) || 
        isOperator(lastCharacter(c_text_expression)) ||
        isPeriod(lastCharacter(c_text_expression))||
        isEmpty(c_text_expression)) 
    {
        
        updateExpression(value)
    }

}

function operatorLogic(operator) {
    if(
        isNumber(lastCharacter(c_text_expression)) || 
        isPeriod(lastCharacter(c_text_expression)) ||
        isPercent(lastCharacter(c_text_expression))
    ) 
    {
        updateExpression(operator)
        c_period = false
    }

    else if(
        isOperator(lastCharacter(c_text_expression))
    )
    {
        backSpace()
        updateExpression(operator)
    }
}

function backSpace() {
    return c_text_expression = c_text_expression.slice(0, -1)
}

function showExprLarge(expr) {
    lcd_big.textContent = `${expr}`
}
function showExprSmall(expr) {
    lcd_small.textContent = `${expr}`
}

function isNumber(value) {
    return typeof parseFloat(value) === 'number' && !isNaN(parseFloat(value))
}
function isOperator(text) {
    const operators = ['+', '-', 'x', '÷']
    return typeof text === 'string' && operators.includes(text)
}
function isPeriod(period) {
    return period ? period.toString() === "." : false
}

function isPercent(percent) {
    return percent ? percent.toString() === "%" : false
}


function updateExpression(text) {
    c_text_expression += `${text}`
    // f_previous = text

    showExprLarge(c_text_expression)
}

function resetExpression() {
    c_text_expression = ""
}

function lastCharacter(string) {
    return string[string.length - 1]
}

function isEmpty(input) {
    if (typeof input === 'string') return input.trim() === ''
    if (Array.isArray(input)) return input.length === 0
    if (input === null || input === undefined) return true;
    return false;
}
