window.onload = function () {
    OnLoadRequireJS("./static/assets/js/app.js")

    // component and random
    OnLoadRequireJS("./static/assets/js/component.js")
    OnLoadRequireJS("./static/assets/js/random/random.js")
    
    // tab and time
    OnLoadRequireJS("./static/assets/js/time/timer.js")
    OnLoadRequireJS("./static/assets/js/time/countdown.js")
    OnLoadRequireJS("./static/assets/js/tab/alert.js")

    // tables
    OnLoadRequireJS("./static/assets/js/table/table.js")

    // operation
    OnLoadRequireJS("./static/assets/js/operation/addition.js")
    OnLoadRequireJS("./static/assets/js/operation/subtraction.js")
    OnLoadRequireJS("./static/assets/js/operation/multiplication.js")
    OnLoadRequireJS("./static/assets/js/operation/division.js")
    OnLoadRequireJS("./static/assets/js/operation/mdas.js")
    OnLoadRequireJS("./static/assets/js/operation/percentage.js")
    OnLoadRequireJS("./static/assets/js/operation/power.js")
    OnLoadRequireJS("./static/assets/js/operation/prime.js")
    OnLoadRequireJS("./static/assets/js/operation/words.js")

    // evaluate 
    
    OnLoadRequireJS("./static/assets/js/evaluate/evaluator.js")
    OnLoadRequireJS("./static/assets/js/evaluate/scoremanager.js")
    
    // page
    OnLoadRequireJS("./static/assets/js/page/activity.js")
    OnLoadRequireJS("./static/assets/js/page/settings.js")
    OnLoadRequireJS("./static/assets/js/page/calculator.js")

    // audio
    OnLoadRequireJS("./static/assets/js/audio/audio.js")
    
    // localstorage
    OnLoadRequireJS("./static/assets/js/storage/storage.js")

    // load
    // countdown.js and app.js first before load.js
    OnLoadRequireJS("./static/assets/js/load/load.js")
    OnLoadRequireJS("./static/assets/js/load/fetch.js")

    // Experimental
    
    OnLoadRequireJS("./static/assets/js/experimental/autosolver.js")
}

function OnLoadRequireJS(path) {
    const app = document.createElement("script")
    app.src = `${path}`
    document.head.appendChild(app)
}