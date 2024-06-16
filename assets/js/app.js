const display_score = document.querySelector("[data-display_score]")
const display_term = document.querySelector("[data-display_term]")
const display_input = document.querySelector("[data-display_input]")
const option_display = document.querySelector("[data-option_display]")

let isSelected = false
let e_minnumber = -9
let e_maxnumber = 9
let e_terms = 2

let e_answer = null
let e_text_answer = null
let e_assess_operation = () => console.log("%c No Operation Yet", "color: white; background-color: purple; padding: .3rem; border-radius: 5px") // null

let e_mintarget_number = 1
let e_maxtarget_number = 9

display_term.addEventListener("click",async () => {
    isSelected = !isSelected
    await isSelectionChanged()
})

display_term.addEventListener("change",async (e) => {
    EvaluateOperation(e.target.value)
    await regenerateOperation()
    display_input.focus()
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