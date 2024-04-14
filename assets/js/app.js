const display_score = document.querySelector("[data-display_score]")
const display_term = document.querySelector("[data-display_term]")
const display_input = document.querySelector("[data-display_input]")

let isSelected = false

display_term.addEventListener("click",async () => {
    isSelected = !isSelected
    await isSelectionChanged()
})

display_term.addEventListener("blur",async () => {
    isSelected = false
    await isSelectionChanged()
})

function getSelectionDisplay() {
    return document.querySelector("[data-selection_display]")
}

// async function isSelectionChanged() {
//     const option = document.querySelector("[data-selection_display]")

//     if (!isSelected && !option) {
//         const newOption = document.createElement("option")
//         newOption.setAttribute("data-selection_display", "")
//         newOption.value = "selection_display"
//         display_term.appendChild(newOption)
//         newOption.textContent = "< option >"

//         display_term.selectedIndex = Array.from(display_term.children).map(p => {
//             p.value
//         }).indexOf("selection_display")

//     } else if (isSelected && option) option.remove()
// }

async function isSelectionChanged() {
    const option = document.querySelector("[data-selection_display]")

    if (!isSelected && !option) {
        const newOption = document.createElement("option")
        newOption.setAttribute("data-selection_display", "")
        newOption.value = "selection_display"
        display_term.appendChild(newOption)
        newOption.textContent = "< option >"
        
        let selectedIndex = -1;
        for (let i = 0; i < display_term.options.length; i++) {
            if (display_term.options[i].value === "selection_display") {
                selectedIndex = i;
                break;
            }
        }
        display_term.selectedIndex = selectedIndex;

    } else if (isSelected && option) option.remove()
}



