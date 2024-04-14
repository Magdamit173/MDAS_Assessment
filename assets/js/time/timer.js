function asyncTimer(seconds) {
    return new Promise((resolve, reject) => {
        if (seconds) setTimeout(() => resolve(), seconds * 1000)
        else reject()
    })
}

function callbackTimer(seconds, callback) {
    if (seconds && callback) setTimeout(() => {
        callback()
    }, seconds * 1000)
}