function assessByMultiplication() {
    const terms = new Array()
    const isTargetNumber = has_target_number.checked
    const isRepeatItself = repeat_itself.checked
    let r_chosen_number = undefined

    for(let i = 0; i < e_terms - isTargetNumber; i++) {
        const chosen_number = configuredRandom(e_minnumber, e_maxnumber + 1)

        if (i == 0 && isRepeatItself) r_chosen_number = chosen_number
        terms.push(r_chosen_number || chosen_number)

        if (isTargetNumber && i == (e_terms - 2)) {
            const t_chosen_number = configuredRandom(e_mintarget_number, e_maxtarget_number + 1)

            terms.push(t_chosen_number)
        }
    }

    const answer = terms.reduce((accumulator, currentValue) => accumulator * currentValue, 1) 
    e_answer = sanitizeFloat(answer)
    e_text_answer = terms.reverse().join(" x ")
}

function configMultiplication() {
    e_assess_operation = assessByMultiplication
}