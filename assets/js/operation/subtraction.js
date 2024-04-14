let s_minnumber = 1
let s_maxnumber = 9
let s_terms = 2

let s_answer = null
let s_text_answer = null

function assessBySubtraction() {
    const terms = new Array()

    for(let i = 0; i < s_terms; i++) {
        const chosen_number = randint(s_minnumber, s_maxnumber + 1)

        terms.push(chosen_number)
    }

    s_answer = terms.reduce((accumulator, currentValue) => accumulator - currentValue, 0) 
    s_text_answer = terms.join(" - ")
}
