function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
function choice(array) {
    return array[Math.floor(array.length * Math.random())]
}
function random(min, max) {
    return Math.random() * (max - min) + min
}