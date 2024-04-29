
function assessBySubtraction() {
    const terms = new Array()

    for(let i = 0; i < e_terms; i++) {
        const chosen_number = randint(e_minnumber, e_maxnumber + 1)

        terms.push(chosen_number)
    }

    e_answer = terms.slice(1, terms.length + 2).reduce((accumulator, currentValue) => accumulator - currentValue, terms[0]) 
    e_text_answer = terms.map(p => {
        return p < 0 ? `(${p})`: p
    }).join(" - ")
}

function configSubtraction() {
    e_assess_operation = assessBySubtraction
}