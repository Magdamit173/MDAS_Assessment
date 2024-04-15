// let m_minnumber = 1
// let m_maxnumber = 9
// let m_terms = 2

// let m_answer = null
// let m_text_answer = null

function assessByMultiplication() {
    const terms = new Array()

    for(let i = 0; i < e_terms; i++) {
        const chosen_number = randint(e_minnumber, e_maxnumber + 1)

        terms.push(chosen_number)
    }

    e_answer = terms.reduce((accumulator, currentValue) => accumulator * currentValue, 1) 
    e_text_answer = terms.join(" x ")
}

function configMultiplication() {
    e_assess_operation = assessByMultiplication
}