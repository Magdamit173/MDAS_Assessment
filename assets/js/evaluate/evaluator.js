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
        break
        case "division":
            configDivision()
        break
        case "percentage":
            configPercentage()
        break
    }
}

function regenerateOperation() {
    e_assess_operation()
    
    option_display.textContent = e_text_answer
}

display_input.addEventListener("keyup",async (e) => {
    if (parseFloat(e.target.value) == parseFloat(e_answer)) {

        e_score += 1
        DisplayScore(e_score)
        e.target.value = ""

        if (has_countdown.checked && !is_countdown) {
            is_countdown = true

            await CountDown(e_countdown)
        }

        add_hlist(`${e_text_answer} = ${e_answer}`)
        regenerateOperation()
        await playCorrect()
    }

    else if(e.target.value === "undefined" && isNaN(e.target.value) == isNaN(e_answer)) {
        
        e_score += 1
        DisplayScore(e_score)
        e.target.value = ""

        if (has_countdown.checked && !is_countdown) {
            is_countdown = true

            await CountDown(e_countdown)
        }

        add_hlist(`${e_text_answer} = ${e_answer}`)
        regenerateOperation()
        await playCorrect()
    }
})