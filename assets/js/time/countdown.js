const has_countdown = document.querySelector("[data-has_countdown]")
const countdown_number = document.querySelector("[data-countdown_number]")

let e_countdown = 30
let is_countdown = false

countdown_number.value = e_countdown
countdown_number.addEventListener("keyup",async (e) => {
    await asyncOverrideTimer(1.2)
    if (parseFloat(e.target.value) > 10) {
        e_countdown = parseFloat(e.target.value)
    }
    else if (e.target.value.length < 3 && parseFloat(e.target.value) < 10){
        e_countdown = 10
        e.target.value = e_countdown
    }

    else if (e.target.value == "") {
        e_countdown = 10
        e.target.value = e_countdown
    }

})
has_countdown.addEventListener("change",async () => {
    if (has_countdown.checked) {
        e_score = 0
        DisplayScore(e_score)
        await InitializedScore()
    }
})


function CountDown(seconds) {
    setTimeout(async () => {
        const high_score = await getLocalStorage("countdown")

        if (((e_score/seconds ) * 60) > parseFloat(high_score)) await setLocalStorage("countdown", (e_score/seconds ) * 60)
        
        const new_high_score = await getLocalStorage("countdown")
        
        customAlert(`Current Score: ${(e_score/seconds ) * 60} per minute, High Score: ${new_high_score}`)
        // setlocalstorage first before e_score = 0
        e_score = 0
        DisplayScore(e_score)
        is_countdown = false

        display_input.blur()
    }, seconds * 1000)
}