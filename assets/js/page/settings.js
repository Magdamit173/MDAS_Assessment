const minnumber_input = document.querySelector("#minnumber_input")
const maxnumber_input = document.querySelector("#maxnumber_input")
const terms_input = document.querySelector("#terms_input")


minnumber_input.value = e_minnumber
maxnumber_input.value = e_maxnumber
terms_input.value = e_terms

minnumber_input.addEventListener("keyup", (e) => {
    e_minnumber = parseFloat(e.target.value)
    
    regenerateOperation()
})
maxnumber_input.addEventListener("keyup", (e) => {
    e_maxnumber = parseFloat(e.target.value)

    regenerateOperation()
})
terms_input.addEventListener("keyup", (e) => {
    e_terms = parseFloat(e.target.value)

    regenerateOperation()
})