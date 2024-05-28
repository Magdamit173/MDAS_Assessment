const has_countdown = document.querySelector("[data-has_countdown]")
const countdown_number = document.querySelector("[data-countdown_number]")

let e_countdown = 60
let is_countdown = false
let countdown_interval_queue = null

countdown_number.value = e_countdown
countdown_number.addEventListener("keyup",async (e) => {
    await asyncOverrideTimer(1.2)
    if (parseFloat(e.target.value) > 10) {
        e_countdown = parseFloat(e.target.value)
        await setLocalStorage("e_countdown", e_countdown)
    }
    else if (e.target.value.length < 3 && parseFloat(e.target.value) < 10){
        e_countdown = 10
        e.target.value = e_countdown
        await setLocalStorage("e_countdown", e_countdown)
    }

    else if (e.target.value == "") {
        e_countdown = 10
        e.target.value = e_countdown
        await setLocalStorage("e_countdown", e_countdown)
    }
})

has_countdown.addEventListener("change",async () => {
    if (has_countdown.checked) {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
        await setLocalStorage("has_countdown", 1)
    }
    else {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
        await setLocalStorage("has_countdown", 0)
    }
})


async function CountDown(seconds) {
    display_term.style.pointerEvents = "none"
    setTimeout(async () => {
        const high_score = await getLocalStorage(`countdown_${s_operation}`)
        if (((e_score/seconds) * 60) > parseFloat(Number(high_score))) await setLocalStorage(`countdown_${s_operation}`, (e_score/seconds ) * 60)
        const new_high_score = await getLocalStorage(`countdown_${s_operation}`)
        
        customAlert(`Current Score: ${(e_score/seconds ) * 60} per minute, High Score: ${new_high_score}`)
        // setlocalstorage first before e_score = 0
        e_score = 0
        DisplayScore(e_score)
        is_countdown = false
        clearInterval(countdown_interval_queue)
        display_input.blur()
        display_term.style.pointerEvents = "auto"
    }, seconds * 1000)

    // TODO: I wonder why i put asyncTimer Here
    await asyncTimer(.1)
    countdown_interval_queue = setInterval(async () => {
        await playCountDown()
    }, 1000)
}