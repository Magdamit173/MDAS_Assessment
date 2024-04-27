const correctAudio = new Audio()
correctAudio.src = `./assets/audio/queue/bell.wav`
correctAudio.volume = .6

const countdownAudio = new Audio()
countdownAudio.src = `./assets/audio/queue/encryptFSTF.wav`

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