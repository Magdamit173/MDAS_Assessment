const minnumber_input = document.querySelector("#minnumber_input")
const maxnumber_input = document.querySelector("#maxnumber_input")
const terms_input = document.querySelector("#terms_input")
const has_times_table = document.querySelector("#times_table")


minnumber_input.value = e_minnumber
maxnumber_input.value = e_maxnumber
terms_input.value = e_terms

minnumber_input.addEventListener("keyup",async (e) => {
    e_minnumber = parseFloat(e.target.value)
    
    await setLocalStorage("e_minnumber", e_minnumber)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_minnumber = -9
        e.target.value = e_minnumber
        await setLocalStorage("e_minnumber", e_minnumber)
    }

    regenerateOperation()
})
maxnumber_input.addEventListener("keyup",async (e) => {
    e_maxnumber = parseFloat(e.target.value)

    await setLocalStorage("e_maxnumber", e_maxnumber)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_maxnumber = 9
        e.target.value = e_maxnumber
        await setLocalStorage("e_maxnumber", e_maxnumber)
    }
    
    regenerateOperation()
})
terms_input.addEventListener("keyup",async (e) => {
    e_terms = parseFloat(e.target.value)

    await setLocalStorage("e_terms", e_terms)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_terms = 2
        e.target.value = e_terms
        await setLocalStorage("e_terms", e_terms)
    }
    
    regenerateOperation()
})

has_times_table.addEventListener("change",async () => {
    if (has_countdown.checked) {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
        await setLocalStorage("has_times_table", 1)
    }
    else {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
        await setLocalStorage("has_times_table", 0)
    }
})