// let m_minnumber = 1
// let m_maxnumber = 9
// let m_terms = 2

// let m_answer = null
// let m_text_answer = null

function assessByDivision() {
    const terms = new Array()
    const any_term = new Array()

    for(let i = 0; i < e_terms; i++) {
        const chosen_number = randint(e_minnumber, e_maxnumber + 1)

        terms.push(chosen_number)
    }

    let first_term = terms.reduce((accumulator, currentValue) => accumulator * currentValue, 1)
    let last_term = new Array()

    console.log(first_term, terms)

    terms.forEach((value, index) => {
        if (index == terms.length) {
            last_term.push(terms[0])
            terms.pop()

            console.log("last part")
        }
        else {
            const chosen_term = choice(terms)
            any_term.push(chosen_term)
            terms.splice(terms.indexOf(chosen_term), 1)

            console.log("anyterm")
        }
    })
    
    any_term.forEach((value, index) => {
        first_term = first_term / value
    })

    e_answer = last_term[0]
    e_text_answer = `${first_term} / ${any_term.split(" / ")}`
}

function configDivision() {
    e_assess_operation = assessByDivision
}