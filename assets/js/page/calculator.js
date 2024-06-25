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
let f_previous = null
let c_zero = false
let c_point = false
let c_backspace = false

reset_event.addEventListener("click", () => {
    c_point = false
    c_zero = false
    c_text_expression = ""
    showExprLarge(c_text_expression)
})

backspace_event.addEventListener("click", () => {
    if (c_text_expression[c_text_expression.length - 1]  == ".") c_point = false
    backspaceExpression()
    f_previous = c_text_expression[c_text_expression.length - 1] 

    showExprLarge(c_text_expression)
})
sign_events.forEach(sign_event => {
    sign_event.addEventListener("click", (sign) => {
        addExpression(sign.target.textContent)
        showExprLarge(c_text_expression)
    })
})
number_events.forEach(number_event => {
    number_event.addEventListener("click", (number) => {
        addExpression(number.target.textContent)
        showExprLarge(c_text_expression)
    })
})
percent_event.addEventListener("click", (percent) => {
    addExpression(percent.target.textContent)
    showExprLarge(c_text_expression)
})

function addExpression(text) {
    if (isNumber(text)) {
        // if number
        appendNumber(text)

    }
    else if (isOperator(text)) {
        // if operator
        appendOperator(text)

    }
    else if (text == "%" && isNumber(f_previous) && !c_text_expression.trim().length == 0) {
        
        c_text_expression += `${text}`
        f_previous = text
    }
    else if (text == "." && isNumber(f_previous) && !c_text_expression.trim().length == 0 && !c_point) {

        c_point = true
        c_text_expression += `${text}`
        f_previous = text
    }

    // console.log(c_text_expression)

}

function appendNumber(text) {
    if (f_previous == "%") return
    if (text == parseFloat(0) & c_zero) return
    if (text !== parseFloat(0) && !c_zero) c_zero = true

    c_text_expression += `${text}`
    f_previous = text
}
function appendOperator(text) {
    if (c_text_expression.trim().length == 0) return
    
    c_zero = false
    if (isOperator(f_previous) && isOperator(text)) backspaceExpression()

    c_text_expression += `${text}`
    f_previous = text
}

function showExprLarge(expr) {
    lcd_big.textContent = `${expr}`
}
function showExprSmall(expr) {
    lcd_small.textContent = `${expr}`
}

function backspaceExpression() {
    c_text_expression = c_text_expression.slice(0, -1)
    return c_text_expression
}


function isNumber(text) {
    return typeof parseFloat(text) === 'number' && !isNaN(parseFloat(text))
}
function isOperator(value) {
    const operators = ['+', '-', 'x', '÷']
    return typeof value === 'string' && operators.includes(value)
}