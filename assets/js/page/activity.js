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
let isTutorials = false
let isSwitch = 0
let isCollapse = false
let isTable = false

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
    
    // table
    equation_table_wrapper.style.display = "none"
    isTable = false
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

    // table
    equation_table_wrapper.style.display = "none"
    isTable = false
})

// TODO: we're gonna have a global click priority in which one click would shut other nav_bar's, has table trigger at `nav_settings` and `nav_calculator`
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
})

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
