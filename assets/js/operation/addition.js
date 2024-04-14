let a_minnumber = 1
let a_maxnumber = 9
let a_terms = 2

let a_answer = null
let a_text_answer = null

function assessByAddition() {
    const terms = new Array()

    for(let i = 0; i < a_terms; i++) {
        const chosen_number = randint(a_minnumber, a_maxnumber + 1)

        terms.push(chosen_number)
    }

    a_answer = terms.reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
    a_text_answer = terms.join(" + ")
}
