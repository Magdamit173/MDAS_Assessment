const correct_audio_source = new Audio()
correct_audio_source.src = `./static/assets/audio/queue/bell.wav`
correct_audio_source.volume = .6

const countdown_audio_source = new Audio()
countdown_audio_source.src = `./static/assets/audio/queue/encryptFSTF.wav`

const has_answer_queue = document.querySelector("#has_answer_queue")
const answer_queue_volume = document.querySelector("#answer_queue_volume")

const has_countdown_queue = document.querySelector("#has_countdown_queue")
const countdown_queue_volume = document.querySelector("#countdown_queue_volume")

has_answer_queue.checked = true
has_countdown_queue.checked = true

//TODO dear myself, fix this mess later or other times (its been 2:09am on a morning XD), hint: naming conventions like countdownQueue and answerQueue shall rename into more meaningful name and its load.js should be variable including `has_target_number` to be converted into variable instead of itself. If not treat quickly it would turn into naming mess.

answer_queue_volume.addEventListener("keyup",async (e) => {
    e_answer_queue_volume = parseFloat(e.target.value)

    await setLocalStorage("e_answer_queue_volume", e_answer_queue_volume)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_answer_queue_volume = 60
        e.target.value = e_answer_queue_volume
        await setLocalStorage("e_answer_queue_volume", e_answer_queue_volume)
    }
    
    await regenerateOperation()
})

countdown_queue_volume.addEventListener("keyup",async (e) => {
    e_countdown_queue_volume = parseFloat(e.target.value)

    await setLocalStorage("e_countdown_queue_volume", e_countdown_queue_volume)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_countdown_queue_volume = 100
        e.target.value = e_countdown_queue_volume
        await setLocalStorage("e_countdown_queue_volume", e_countdown_queue_volume)
    }
    
    await regenerateOperation()
})


answer_queue_volume.addEventListener("change",async (e) => {
    e_answer_queue_volume = parseFloat(e.target.value)
    e.target.value = e_answer_queue_volume

    correct_audio_source.volume = e_answer_queue_volume / 100
    console.log(e_answer_queue_volume / 100)
    await setLocalStorage("e_answer_queue_volume", e_answer_queue_volume)
    
    await regenerateOperation()
})

countdown_queue_volume.addEventListener("change",async (e) => {
    e_countdown_queue_volume = parseFloat(e.target.value)
    e.target.value = e_countdown_queue_volume

    countdown_audio_source.volume = e_countdown_queue_volume / 100
    console.log(e_countdown_queue_volume / 100)
    await setLocalStorage("e_countdown_queue_volume", e_countdown_queue_volume)

    await regenerateOperation()
})

has_answer_queue.addEventListener("change",async () => {
    if (!has_answer_queue.checked) {
        correct_audio_source.muted = true
        await setLocalStorage("e_has_answer_queue", 0)
    }
    else {
        correct_audio_source.muted = false
        await setLocalStorage("e_has_answer_queue", 1)
    }
})


has_countdown_queue.addEventListener("change",async () => {
    if (!has_countdown_queue.checked) {
        countdown_audio_source.muted = true
        await setLocalStorage("e_has_countdown_queue", 0)
    }
    else {
        countdown_audio_source.muted = false
        await setLocalStorage("e_has_countdown_queue", 1)
    }
})

async function playCorrect() {
    correct_audio_source.pause()
    correct_audio_source.currentTime = 0
    await correct_audio_source.play()
}
async function playCountDown() {
    countdown_audio_source.pause()
    countdown_audio_source.currentTime = 0
    await countdown_audio_source.play()
}