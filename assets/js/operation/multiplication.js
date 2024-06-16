function assessByMultiplication() {
    const terms = new Array()
    const isTargetNumber = has_target_number.checked

    for(let i = 0; i < e_terms - isTargetNumber; i++) {
        const chosen_number = randint(e_minnumber, e_maxnumber + 1)

        terms.push(chosen_number)

        if (isTargetNumber && i == (e_terms - 2)) {
            const t_chosen_number = randint(e_mintarget_number, e_maxtarget_number + 1)

            terms.push(t_chosen_number)
        }
    }

    e_answer = terms.reduce((accumulator, currentValue) => accumulator * currentValue, 1) 
    e_text_answer = terms.join(" x ")
}

function configMultiplication() {
    e_assess_operation = assessByMultiplication
}