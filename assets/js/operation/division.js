function assessByDivision() {
    const terms = new Array()
    const any_term = new Array()

    for(let i = 0; i < e_terms; i++) {
        const chosen_number = randint(e_minnumber, e_maxnumber + 1)

        terms.push(chosen_number)
    }
    let first_term = terms.reduce((accumulator, currentValue) => accumulator * currentValue, 1)
    const c_first_term = first_term

    for(let k = 0; k < e_terms; k++) {
        first_term /= terms[k]
        any_term.push(terms[k])
    }

    non_infinite_answer = any_term[any_term.length - 1]
    e_answer = (!isNaN(first_term)) ? non_infinite_answer : NaN
    e_text_answer = `${c_first_term} / ${any_term.slice(0, any_term.length - 1, 1).join(" / ")}`
}

function configDivision() {
    e_assess_operation = assessByDivision
}