function EvaluateOperation(operation) {
    switch (operation) {
        case "addition":
            configAddition()
        break
        case "subtraction":
            configSubtraction()
        break
        case "multiplication":
            configMultiplication()
    }
}

function regenerateOperation() {
    e_assess_operation()
    
    option_display.textContent = e_text_answer
}

display_input.addEventListener("keyup",async (e) => {
    if (e.target.value == e_answer) {
        display_score.textContent = parseFloat(display_score.textContent) + 1
        e.target.value = ""

        add_hlist(`${e_text_answer} = ${e_answer}`)
        regenerateOperation()
    }
})