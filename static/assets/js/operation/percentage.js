function assessByPercentage() {

    const base = randint(e_minnumber, e_maxnumber + 1)
    const random_percent = randint(0, 100)

    const percent_of_base = base * (random_percent/100)

    e_answer = sanitizeFloat(percent_of_base)
    e_text_answer = `${random_percent}% of ${base}`
}

function configPercentage() {
    e_assess_operation = assessByPercentage
}