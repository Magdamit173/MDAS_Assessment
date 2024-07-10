const nav_tutorials = document.querySelector("[data-nav_tutorials]")
const nav_settings = document.querySelector("[data-nav_settings]")
const nav_calculator = document.querySelector("[data-nav_calculator]")
const nav_table = document.querySelector("[data-nav_table]")
const settings_wrapper = document.querySelector("[data-settings_wrapper]")

const solving_bar = document.querySelector("[data-solving_bar]")
const calculator_bar = document.querySelector("[data-calculator_bar]")

const history_collapse = document.querySelector("[data-history_collapse]").children[0]
const history_bar = document.querySelector("[data-history_bar]")

let isSettings = false
let isTable = false
let isSwitch = false
let isPreviousClicked = true
let invertSwitch = true

let isTutorials = false
let isCollapse = false

nav_tutorials.addEventListener("click", () => {
    location.href = "./tutorials"
})


nav_table.addEventListener("click",async () => {
    if (!(await getLocalStorage("table"))) {
        customAlert("These Tables Are Based On `Random Number Selector` Located At Settings",async (cancel, sure) => {
            await setLocalStorage("table", 1)
            customAlert("Experimental Feature :)",async (cancel, sure) => {

            })
        })
    }

    if (isTable) {
        equation_table_wrapper.style.display = "none"
        isTable = false
    }
    else {
        equation_table_wrapper.style.display = "flex"
        isTable = true
    }

    // settings
    settings_wrapper.style.display = "none"
    isSettings = false

    // switch
    if (isTable && invertSwitch) {
        nav_calculator.textContent = "Home"
    }
    else if (!isTable && invertSwitch) {
        nav_calculator.textContent = "Calculator"
    }
    else if (isTable && !invertSwitch) {
        nav_calculator.textContent = "Calculator"
    }
    else if (!isTable && !invertSwitch) {
        nav_calculator.textContent = "Home"
    }

    isPreviousClicked = false
    history.pushState({ default: '0' }, "Default View", "/")
})

nav_calculator.addEventListener("click",async () => {
    if (!(await getLocalStorage("calculator"))) {
        customAlert("Still Buggy Hope You Like It",async (cancel, confirm) => {
            confirm(async () => {
                await setLocalStorage("calculator", 1)
            })
        })
    }

    if (isSwitch && isPreviousClicked) {
        solving_bar.style.display = "flex"
        calculator_bar.style.display  = "none"
        // nav_calculator.textContent = "Calculator"
        isSwitch = false
    }
    else if(!isSwitch && isPreviousClicked) {
        solving_bar.style.display = "none"
        calculator_bar.style.display = "flex"
        // nav_calculator.textContent = "Home"
        isSwitch = true
    }
    
    isPreviousClicked = true

    // settings
    settings_wrapper.style.display = "none"
    isSettings = false

    // table
    equation_table_wrapper.style.display = "none"
    isTable = false

    
    // switch
    if (isSwitch) {
        nav_calculator.textContent = "Home"
        invertSwitch = false
    }
    else {
        nav_calculator.textContent = "Calculator"
        invertSwitch = true
    }
    history.pushState({ default: '0' }, "Default View", "/")
})


nav_settings.addEventListener("click",async () => {
    if (!await getLocalStorage("isSettingCounter")) {
        customAlert(`click "Settings" again to exit Settings`,async (cancel, confirm) => {
            confirm(async () => {
                await setLocalStorage("isSettingCounter", true)
            })
        })
    }

    if (isSettings) {
        settings_wrapper.style.display = "none"
        isSettings = false
    }
    else {
        settings_wrapper.style.display = "block"
        isSettings = true
    }
    

    // table
    equation_table_wrapper.style.display = "none"
    isTable = false

    // switch
    if (isSettings && invertSwitch) {
        nav_calculator.textContent = "Home"
    }
    else if (!isSettings && invertSwitch) {
        nav_calculator.textContent = "Calculator"
    }
    else if (isSettings && !invertSwitch) {
        nav_calculator.textContent = "Calculator"
    }
    else if (!isSettings && !invertSwitch) {
        nav_calculator.textContent = "Home"
    }
    isPreviousClicked = false
    history.pushState({ default: '0' }, "Default View", "/")
})

// popstate:

// window.addEventListener('popstate', function(event) {
//     console.log("yeah?")
// })

window.addEventListener('popstate', function(event) {
    // Handle the state change here
    const state = event.state

    if (state && state.default === '0') {
        // Reset everything to default state
        isPreviousClicked = true

        settings_wrapper.style.display = "none"
        isSettings = false
        equation_table_wrapper.style.display = "none"
        isTable = false
        solving_bar.style.display = "flex"
        calculator_bar.style.display = "none"
        isSwitch = true
        nav_calculator.textContent = "Calculator"
        invertSwitch = true
    }
})


// history column

history_collapse.addEventListener("click", () => {
    if (isCollapse) {
        history_bar.style.display = "none"
        history_collapse.style.right = '-50dvw'
        history_collapse.style.transform = `rotate(0deg)`
        history_collapse.style.animation = `left_arrow .2s ease`

        isCollapse = false
    }
    else {
        history_bar.style.display = "flex"
        history_collapse.style.transform = `rotate(180deg)`
        history_collapse.style.animation = `right_arrow .2s ease`
        history_collapse.style.right = '0'

        isCollapse = true
    }
})

resizeCollapse()
window.addEventListener("resize", () => {
    resizeCollapse()
})
function resizeCollapse() {
    // history_bar
    if (innerWidth < 600) {
        history_collapse.style.right = `-50dvw`
        history_collapse.style.display = "block"
        history_collapse.style.transform = `rotate(0deg)`
        history_collapse.style.animation = `left_arrow .2s ease`

        history_bar.style.display = "none"

        isCollapse = false
    }
    else {
        history_collapse.style.top = `0`
        history_collapse.style.display = "none"

        history_bar.style.display = "flex"
    }
    //
}
