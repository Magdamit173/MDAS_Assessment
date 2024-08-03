const nav_tutorials = document.querySelector("[data-nav_tutorials]")
const nav_settings = document.querySelector("[data-nav_settings]")
const nav_calculator = document.querySelector("[data-nav_calculator]")
const nav_table = document.querySelector("[data-nav_table]")
const nav_rank = document.querySelector("[data-nav_rank]")
const nav_home = document.querySelector("[data-nav_home]")

const rank_wrapper = document.querySelector("[data-rank_wrapper]")
const settings_wrapper = document.querySelector("[data-settings_wrapper]")

const solving_bar = document.querySelector("[data-solving_bar]")
const calculator_bar = document.querySelector("[data-calculator_bar]")

const history_collapse = document.querySelector("[data-history_collapse]").children[0]
const history_bar = document.querySelector("[data-history_bar]")

let which_nav_focus = null
let which_wrapper_focus = null

let isRank = false
let isSettings = false
let isTable = false
let isSwitch = false
let isPreviousClicked = true
let invertSwitch = true

let isTutorials = false
let isCollapse = false

nav_tutorials.addEventListener("click", () => {
    location.href = "../static/tutorials/index.html"
})


showNav(nav_home, solving_bar, "flex", async (def) => {
    def(solving_bar)
})

showNav(nav_calculator, calculator_bar, "flex", async (def) => {
    if (!(await getLocalStorage("calculator"))) {
        customAlert("Still Buggy Hope You Like It",async (cancel, confirm) => {
            confirm(async () => {
                await setLocalStorage("calculator", 1)
            })
        })
    }    
    def(solving_bar)
})

showNav(nav_table, equation_table_wrapper, "flex", async () => {
    if (!(await getLocalStorage("table"))) {
        customAlert("These Tables Are Based On `Random Number Selector` Located At Settings",async (cancel, sure) => {
            await setLocalStorage("table", 1)
            customAlert("Experimental Feature :)",async (cancel, sure) => {

            })
        })
    }
})

showNav(nav_rank, rank_wrapper, "flex", async () => {
    if (!(await getLocalStorage("rank"))) {
        customAlert("Turn on 'Has Timer' in settings and set your username and password settings to participate in online ranking.",async (cancel, confirm) => {
            confirm(async () => {
                await setLocalStorage("rank", 1)
            })
        })
    }

})

showNav(nav_settings, settings_wrapper, "block", async () => {
    if (!await getLocalStorage("isSettingCounter")) {
        customAlert(`click "Settings" again to exit Settings`,async (cancel, okay) => {
            okay(async () => {
                await setLocalStorage("isSettingCounter", true)
            })
        })
    }
})

function showNav(nav_element, wrapper, css_display, callback) {
    // nav_element use for eventlistener
    // wrapper as wrapper of triggered event

    nav_element.addEventListener("click",async () => {
        let default_wrapper = null

        await callback((def) => {
            default_wrapper = def
        })

        if (wrapper == null || wrapper == "" || wrapper == undefined) {
            if (which_wrapper_focus) {
                which_wrapper_focus.style.display = "none"

                which_nav_focus = nav_element
                which_wrapper_focus = wrapper
            }
            return
        }

        else if (which_nav_focus != nav_element && which_wrapper_focus) {
            which_wrapper_focus.style.display = "none"
        }

        if (default_wrapper) {
            if (wrapper.style.display == "" || wrapper.style.display == "none") {

                if (default_wrapper == wrapper) wrapper = default_wrapper

                default_wrapper.style.display = "none"
                wrapper.style.display = css_display
            }
            else {
                wrapper.style.display = "none"
                default_wrapper.style.display = css_display // solving_bar
            }
        }

        else if (wrapper.style.display == "" || wrapper.style.display == "none") {
            wrapper.style.display = css_display
        }
        else {
            wrapper.style.display = "none"
        }

        which_nav_focus = nav_element
        which_wrapper_focus = wrapper

    })

}

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
