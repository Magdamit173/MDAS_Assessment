function solve_script() {
    // const answer = `${eval(display_term.children[0].textContent.split("x").join("*"))}`
    const answer = e_answer

    // display_input.focus()
    display_input.value = answer

    display_input.dispatchEvent(new KeyboardEvent("keyup", { key: " ", bubbles: true }))
}

function autosolve() {
    setInterval( () => {
        solve_script()
    }, 100)
}
