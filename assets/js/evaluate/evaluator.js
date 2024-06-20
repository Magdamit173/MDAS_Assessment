let s_operation = null

function EvaluateOperation(operation) {
    s_operation = operation

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
        case "prime":
            configPrime()
        break
        case "words":
            configWords()
        break
    }
}

async function regenerateOperation() {
    await e_assess_operation()
    
    option_display.textContent = e_text_answer
}

function configuredRandom(min, max) {
    if (e_number_type == "Integer") return randint(min, max)
    else if (e_number_type == "Float" && e_number_steps !== 0) return Math.round((Math.round(random(min, max) / e_number_steps) * e_number_steps + Number.EPSILON) * 100) / 100
    else if (e_number_type == "Float" && e_number_steps === 0) return Math.round((random(min, max) + Number.EPSILON) * 100) / 100
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
        await regenerateOperation()
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
        await regenerateOperation()
        await playCorrect()
    }

    else if ((typeof e.target.value.toString() === 'string') && (e.target.value.toString() == e_answer.toString())) {
        
        e_score += 1
        DisplayScore(e_score)
        e.target.value = ""

        if (has_countdown.checked && !is_countdown) {
            is_countdown = true

            await CountDown(e_countdown)
        }

        add_hlist(`${e_text_answer} = ${e_answer}`)
        await regenerateOperation()
        await playCorrect()
    }
})