const display_score = document.querySelector("[data-display_score]")
const display_term = document.querySelector("[data-display_term]")
const display_input = document.querySelector("[data-display_input]")
const option_display = document.querySelector("[data-option_display]")

// setTimeout(() => {
//     settings_wrapper.scrollTo(0, settings_wrapper.scrollHeight)
// }, 0.200) // temporary

let isSelected = false
let e_minnumber = 1
let e_maxnumber = 9
let e_terms = 2

let e_answer = null
let e_text_answer = null
let e_assess_operation = () => {
    console.log("%c No Operation Yet", "color: var(--primary-text); background-color: purple; padding: .3rem; border-radius: 5px") // null
}

let e_mintarget_number = 1
let e_maxtarget_number = 9

let e_number_steps = 0
let e_number_type = "Integer"

let e_answer_queue_volume = 60
let e_countdown_queue_volume = 100

let e_has_answer_queue = true
let e_has_countdown_queue = true
let e_has_countdown = false
let e_has_target_number = false
let e_repeat_itself = false

let e_username_input = `anonymous-${new Date().getTime()}`
let e_password_input = "default"

display_term.addEventListener("click",async () => {
    isSelected = !isSelected
    await isSelectionChanged()
})

display_term.addEventListener("change",async (e) => {
    EvaluateOperation(e.target.value)
    await regenerateOperation()
    display_input.focus()

    await processTables(e_minnumber, e_maxnumber, wordToSign(s_operation))
})

display_term.addEventListener("blur",async () => {
    isSelected = false
    await isSelectionChanged()
})

function getSelectionDisplay() {
    return document.querySelector("[data-option_display]")
}

async function isSelectionChanged() {

    if (!isSelected) {
        let selectedIndex = -1;
        for (let i = 0; i < display_term.options.length; i++) {
            if (display_term.options[i].value === "option_display") {
                selectedIndex = i;
                break;
            }
        }
        // option_display.style.display = "block"
        display_term.selectedIndex = selectedIndex;

    } else if (isSelected) {
        // option_display.style.display = "none"
    }
}