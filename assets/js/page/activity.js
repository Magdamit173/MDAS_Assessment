const nav_tutorials = document.querySelector("[data-nav_tutorials]")
const nav_settings = document.querySelector("[data-nav_settings]")
const nav_calculator = document.querySelector("[data-nav_calculator]")
const settings_wrapper = document.querySelector("[data-settings_wrapper]")

const solving_bar = document.querySelector("[data-solving_bar]")
const calculator_bar = document.querySelector("[data-calculator_bar]")

// temporary isSettingCounter
let isSettingCounter = 0
let isSettings = false
let isTutorials = false
let isSwitch = 0

nav_settings.addEventListener("click",async () => {
    if (isSettingCounter == 0) {
        customAlert(`click "Settings" again to exit Settings`, () => {

        })
        isSettingCounter += 1
        await setLocalStorage("isSettingCounter", isSettingCounter)
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

nav_calculator.addEventListener("click", () => {
    customAlert("Unavailable Calculator, On Maintenance", () => {
        nav_calculator.remove()

        solving_bar.style.display = "flex"
        calculator_bar.style.display  = "none"
    })

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