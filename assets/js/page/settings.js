const survey = document.querySelector("#survey")
const reset_preference = document.querySelector("#reset_preference")

const minnumber_input = document.querySelector("#minnumber_input")
const maxnumber_input = document.querySelector("#maxnumber_input")
const terms_input = document.querySelector("#terms_input")

const has_target_number = document.querySelector("#target_number")
const mintarget_input = document.querySelector("#mintarget_input")
const maxtarget_input = document.querySelector("#maxtarget_input")

const number_steps = document.querySelector("#number_steps")
const number_type = document.querySelector("#number_type")

minnumber_input.value = e_minnumber
maxnumber_input.value = e_maxnumber
terms_input.value = e_terms

mintarget_input.value = e_mintarget_number
maxtarget_input.value = e_maxtarget_number

number_steps.value = e_number_steps
number_type.value = e_number_type

survey.addEventListener("click",async () => {
    const formlink = "https://forms.gle/D1jWEjL1DiuMMvps5"

    if (!await getLocalStorage("survey")) {
        customAlert("Do You Want To Suggest A Feature?", (cancel, sure) => {
            sure(async () => {
                await setLocalStorage("survey")
                open(formlink)
            }) 
        })
    }
    else open(formlink)
})
reset_preference.addEventListener("click",async () => {
    customAlert("Are you sure to reset your Saved Preference?", (cancel, sure) => {
        sure(async () => {
            localStorage.clear()
            location.reload()
        })
    })
})

minnumber_input.addEventListener("keyup",async (e) => {
    e_minnumber = parseFloat(e.target.value)
    
    await setLocalStorage("e_minnumber", e_minnumber)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_minnumber = 1
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

number_steps.addEventListener("keyup",async (e) => {
    e_number_steps = parseFloat(e.target.value)

    await setLocalStorage("e_number_steps", e_number_steps)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_number_steps = 0
        e.target.value = e_number_steps
        await setLocalStorage("e_number_steps", e_number_steps)
    }
    
    await regenerateOperation()
})


number_type.addEventListener("change",async (e) => {
    e_number_type = e.target.value

    await setLocalStorage("e_number_type", e_number_type)
    await asyncOverrideTimer(.3)
    if (!(e.target.value)) {
        e_number_type = "Integer"
        e.target.value = e_number_type
        await setLocalStorage("e_number_type", e_number_type)
    }
    
    await regenerateOperation()
})

// has_countdown and countdown_number was at "assets/js/time/countdown.js"
// has_answer_queue, answer_queue_volume, has_countdown_queue, countdown_queue_volume was at "assets/js/audio/audio.js"