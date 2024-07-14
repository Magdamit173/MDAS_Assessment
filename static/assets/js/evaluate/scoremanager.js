// modes: casual, countdown
// display_score.textContent = parseFloat(display_score.textContent) + 1
// e.target.value = ""

let e_score = 0

async function InitializedScore() {
    if(!await getLocalStorage("casual")) {
        await setLocalStorage("casual", 0)
    }
    if(!await getLocalStorage("countdown")) {
        await setLocalStorage("countdown", 0)
    }
}

function DisplayScore(number) {
    display_score.textContent = `${number}`
}

