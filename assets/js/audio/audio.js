const correctAudio = new Audio()
correctAudio.src = `./assets/audio/queue/bell.wav`
correctAudio.volume = .6

const countdownAudio = new Audio()
countdownAudio.src = `./assets/audio/queue/encryptFSTF.wav`

const answerQueue = document.querySelector("#answer_queue")
const answerQueueVolume = document.querySelector("#answer_queue_volume")

const countdownQueue = document.querySelector("#countdown_queue")
const countdownQueueVolume = document.querySelector("#countdown_queue_volume")

answerQueue.checked = true
countdownQueue.checked = true

//TODO dear myself, fix this mess later or other times (its been 2:09am on a morning XD), hint: naming conventions like countdownQueue and answerQueue shall rename into more meaningful name and its load.js should be variable including `has_target_number` to be converted into variable instead of itself. If not treat quickly it would turn into naming mess.

answerQueueVolume.addEventListener("keyup",async (e) => {
    e_answer_queue_volume = parseFloat(e.target.value)

    await setLocalStorage("e_answer_queue_volume", e_answer_queue_volume)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_answer_queue_volume = 0.6
        e.target.value = e_answer_queue_volume
        await setLocalStorage("e_answer_queue_volume", e_answer_queue_volume)
    }
    
    await regenerateOperation()
})

countdownQueueVolume.addEventListener("keyup",async (e) => {
    e_countdown_queue_volume = parseFloat(e.target.value)

    await setLocalStorage("e_countdown_queue_volume", e_countdown_queue_volume)
    await asyncOverrideTimer(.3)
    if (!parseFloat(e.target.value)) {
        e_countdown_queue_volume = 1
        e.target.value = e_countdown_queue_volume
        await setLocalStorage("e_countdown_queue_volume", e_countdown_queue_volume)
    }
    
    await regenerateOperation()
})

answerQueue.addEventListener("change",async () => {
    if (!answerQueue.checked) {
        correctAudio.muted = true
        await setLocalStorage("e_answer_queue", 0)
    }
    else {
        correctAudio.muted = false
        await setLocalStorage("e_answer_queue", 1)
    }
})


countdownQueue.addEventListener("change",async () => {
    if (!countdownQueue.checked) {
        countdownAudio.muted = true
        await setLocalStorage("e_countdown_queue", 0)
    }
    else {
        countdownAudio.muted = false
        await setLocalStorage("e_countdown_queue", 1)
    }
})

async function playCorrect() {
    correctAudio.pause()
    correctAudio.currentTime = 0
    await correctAudio.play()
}
async function playCountDown() {
    countdownAudio.pause()
    countdownAudio.currentTime = 0
    await countdownAudio.play()
}