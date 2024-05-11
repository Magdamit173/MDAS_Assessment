function assessByPrime() {
    const chosen_number = randint(e_minnumber, e_maxnumber + 1)

    if (chosen_number < 2) {
        e_answer = false
        return
    }
    for (let i = 2; i <= Math.sqrt(chosen_number); i++) if (chosen_number % i === 0)  {
        e_answer = false
        return
    }
    
    e_answer = true
    e_text_answer = `${chosen_number}'`
}

function configPrime() {
    e_assess_operation = assessByPrime
}