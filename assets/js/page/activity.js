const nav_tutorials = document.querySelector("[data-nav_tutorials]")
const nav_settings = document.querySelector("[data-nav_settings]")
const settings_wrapper = document.querySelector("[data-settings_wrapper]")

// temporary isSettingCounter
let isSettingCounter = 0
let isSettings = false
let isTutorials = false

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