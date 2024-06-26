const nav_tutorials = document.querySelector("[data-nav_tutorials]")
const nav_settings = document.querySelector("[data-nav_settings]")
const nav_calculator = document.querySelector("[data-nav_calculator]")
const settings_wrapper = document.querySelector("[data-settings_wrapper]")

const solving_bar = document.querySelector("[data-solving_bar]")
const calculator_bar = document.querySelector("[data-calculator_bar]")

// temporary isSettingCounter
let isSettings = false
let isTutorials = false
let isSwitch = 0

nav_settings.addEventListener("click",async () => {
    if (!await getLocalStorage("isSettingCounter")) {
        customAlert(`click "Settings" again to exit Settings`,async (cancel, confirm) => {
            confirm(async () => {
                await setLocalStorage("isSettingCounter", true)
            })
        })
    }

    if (isSettings) settings_wrapper.style.display = "none"
    else settings_wrapper.style.display = "block"
    
    isSettings = !isSettings
})

// TODO change this eventlistener on the future
nav_tutorials.addEventListener("click", () => {
    location.href = "./tutorials"
    // if (isTutorials) return
    // customAlert("Not Available for A meantime", () => {

    // })
    // isTutorials = true
})

nav_calculator.addEventListener("click",async () => {
    if (!(await getLocalStorage("calculator"))) {
        customAlert("Still Buggy Hope You Like It",async (cancel, confirm) => {
            confirm(async () => {
                await setLocalStorage("calculator", 1)
            })
        })
    }

    if (isSwitch) {
        solving_bar.style.display = "flex"
        calculator_bar.style.display  = "none"
    }
    else if(!isSwitch) {
        solving_bar.style.display = "none"
        calculator_bar.style.display = "flex"
    }
    
    isSwitch = !isSwitch
})