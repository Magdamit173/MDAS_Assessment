const minnumber_input = document.querySelector("#minnumber_input")
const maxnumber_input = document.querySelector("#maxnumber_input")
const terms_input = document.querySelector("#terms_input")

const has_target_number = document.querySelector("#target_number")
const mintarget_input = document.querySelector("#mintarget_input")
const maxtarget_input = document.querySelector("#maxtarget_input")

minnumber_input.value = e_minnumber
maxnumber_input.value = e_maxnumber
terms_input.value = e_terms

mintarget_input.value = e_mintarget_number
maxtarget_input.value = e_maxtarget_number

minnumber_input.addEventListener("keyup",async (e) => {
    e_minnumber = parseFloat(e.target.value)
    
    await setLocalStorage("e_minnumber", e_minnumber)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_minnumber = -9
        e.target.value = e_minnumber
        await setLocalStorage("e_minnumber", e_minnumber)
    }

    await regenerateOperation()
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
    
    await regenerateOperation()
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
    
    await regenerateOperation()
})

has_target_number.addEventListener("change",async () => {
    if (has_target_number.checked) {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
        await setLocalStorage("has_target_number", 1)
    }
    else {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
        await setLocalStorage("has_target_number", 0)
    }
    await regenerateOperation()
})


mintarget_input.addEventListener("keyup",async (e) => {
    e_mintarget_number = parseFloat(e.target.value)
    
    await setLocalStorage("e_mintarget_number", e_mintarget_number)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_mintarget_number = 1
        e.target.value = e_mintarget_number
        await setLocalStorage("e_mintarget_number", e_mintarget_number)
    }

    await regenerateOperation()
})
maxtarget_input.addEventListener("keyup",async (e) => {
    e_maxtarget_number = parseFloat(e.target.value)

    await setLocalStorage("e_maxtarget_number", e_maxtarget_number)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_maxtarget_number = 9
        e.target.value = e_maxtarget_number
        await setLocalStorage("e_maxtarget_number", e_maxtarget_number)
    }
    
    await regenerateOperation()
})

// has_countdown and countdown_number was at "assets/js/time/countdown.js"