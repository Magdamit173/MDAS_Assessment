window.onload = async function () {
    await OnLoadRequireJS("../static/assets/js/app.js")

    // component and random
    await OnLoadRequireJS("../static/assets/js/component.js")
    await OnLoadRequireJS("../static/assets/js/random/random.js")
    
    // tab and time
    await OnLoadRequireJS("../static/assets/js/time/timer.js")
    await OnLoadRequireJS("../static/assets/js/time/countdown.js")
    await OnLoadRequireJS("../static/assets/js/tab/alert.js")

    // tables
    await OnLoadRequireJS("../static/assets/js/table/table.js")

    // operation
    await OnLoadRequireJS("../static/assets/js/operation/addition.js")
    await OnLoadRequireJS("../static/assets/js/operation/subtraction.js")
    await OnLoadRequireJS("../static/assets/js/operation/multiplication.js")
    await OnLoadRequireJS("../static/assets/js/operation/division.js")
    await OnLoadRequireJS("../static/assets/js/operation/mdas.js")
    await OnLoadRequireJS("../static/assets/js/operation/percentage.js")
    await OnLoadRequireJS("../static/assets/js/operation/power.js")
    await OnLoadRequireJS("../static/assets/js/operation/prime.js")
    await OnLoadRequireJS("../static/assets/js/operation/words.js")

    // evaluate 
    
    await OnLoadRequireJS("../static/assets/js/evaluate/evaluator.js")
    await OnLoadRequireJS("../static/assets/js/evaluate/scoremanager.js")
    
    // page
    await OnLoadRequireJS("../static/assets/js/page/activity.js")
    await OnLoadRequireJS("../static/assets/js/page/settings.js")
    await OnLoadRequireJS("../static/assets/js/page/calculator.js")

    // audio
    await OnLoadRequireJS("../static/assets/js/audio/audio.js")
    
    // localstorage
    await OnLoadRequireJS("../static/assets/js/storage/storage.js")

    // load
    // countdown.js and app.js first before load.js
    OnLoadRequireJS("../static/assets/js/load/load.js")
    await OnLoadRequireJS("../static/assets/js/load/fetch.js")

    // Experimental
    
    await OnLoadRequireJS("../static/assets/js/experimental/autosolver.js")
}

async function OnLoadRequireJS(path) {
    const app = document.createElement("script")
    app.src = `${path}`
    document.head.appendChild(app)
}