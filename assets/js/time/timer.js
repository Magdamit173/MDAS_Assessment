let timeoutID

function asyncTimer(seconds) {
    return new Promise((resolve, reject) => {
        if (seconds) setTimeout(() => resolve(), seconds * 1000)
        else reject()
    })
}

function asyncOverrideTimer(seconds) {
    if (timeoutID) {
        clearTimeout(timeoutID)
    }

    return new Promise((resolve, reject) => {
        timeoutID = setTimeout(() => {
            resolve()
        }, seconds * 1000)

        if (!seconds) {
            reject("Seconds not provided")
        }
    })
}


function callbackTimer(seconds, callback) {
    if (seconds && callback) setTimeout(() => {
        callback()
    }, seconds * 1000)
}