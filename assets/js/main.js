window.onload = function () {
    OnLoadRequireJS("./assets/js/app.js")
    OnLoadRequireJS("./assets/js/component.js")
    OnLoadRequireJS("./assets/js/random/random.js")
    
    OnLoadRequireJS("./assets/js/time/timer.js")

    OnLoadRequireJS("./assets/js/operation/addition.js")
    OnLoadRequireJS("./assets/js/operation/subtraction.js")
    OnLoadRequireJS("./assets/js/operation/multiplication.js")
}

function OnLoadRequireJS(path) {
    const app = document.createElement("script")
    app.src = `${path}`
    document.head.appendChild(app)
}