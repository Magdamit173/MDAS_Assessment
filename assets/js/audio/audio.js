const audio = new Audio()
audio.src = `./assets/audio/queue/encryptFSTF.wav`

async function playAudio() {
    await audio.play()
}