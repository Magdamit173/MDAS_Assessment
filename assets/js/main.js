window.onload = function () {
    OnLoadRequireJS("./assets/js/app.js")
    OnLoadRequireJS("./assets/js/component.js")
    OnLoadRequireJS("./assets/js/random/random.js")
    
    OnLoadRequireJS("./assets/js/time/timer.js")
    OnLoadRequireJS("./assets/js/tab/alert.js")

    OnLoadRequireJS("./assets/js/operation/addition.js")
    OnLoadRequireJS("./assets/js/operation/subtraction.js")
    OnLoadRequireJS("./assets/js/operation/multiplication.js")
    OnLoadRequireJS("./assets/js/operation/division.js")

    OnLoadRequireJS("./assets/js/operation/evaluator.js")
    
    OnLoadRequireJS("./assets/js/page/activity.js")
    OnLoadRequireJS("./assets/js/page/settings.js")
    OnLoadRequireJS("./assets/js/page/tutorials.js")
    
}

function OnLoadRequireJS(path) {
    const app = document.createElement("script")
    app.src = `${path}`
    document.head.appendChild(app)
}