function assessByPower() {
    const base_number = randint(e_minnumber, e_maxnumber + 1)
    const exponent_number = randint(0, e_terms)

    e_answer = base_number ** exponent_number
    e_text_answer = `${base_number}^${exponent_number}`
}

function configPower() {
    e_assess_operation = assessByPower
}