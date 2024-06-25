function customAlert(text, callback) {
    const custom_alert = document.createElement("div")
    custom_alert.setAttribute("class", "custom_alert")

    const alert_text = document.createElement("div")
    alert_text.setAttribute("class", "alert_text")
    alert_text.setAttribute("data-alert_text", "")

    alert_text.textContent = text ? text : "< Empty Text >"

    const alert_option = document.createElement("div")
    alert_option.setAttribute("class", "alert_option")

    const alert_cancel = document.createElement("button")
    alert_cancel.setAttribute("class", "alert_cancel")
    alert_cancel.setAttribute("data-alert_cancel", "")
    alert_cancel.textContent = `Cancel`

    const alert_confirm = document.createElement("button")
    alert_confirm.setAttribute("class", "alert_confirm")
    alert_confirm.setAttribute("data-alert_confirm", "")
    alert_confirm.textContent = `Confirm`

    custom_alert.appendChild(alert_text)
    custom_alert.appendChild(alert_option)

    alert_option.appendChild(alert_cancel)
    alert_option.appendChild(alert_confirm)

    document.body.appendChild(custom_alert)

    function cancel() {
        custom_alert.remove()
        callback((cancel_callback) => {
            cancel_callback()
        }, () => { })
    }

    function confirm() {
        custom_alert.remove()
        callback(() => { }, (confirm_callback) => {
            confirm_callback()
        })
    }

    alert_cancel.addEventListener("click", cancel)
    alert_confirm.addEventListener("click", confirm)

}


// if (window.innerWidth <= 640) customAlert("Sorry, Desktop Supported Website, Proceed to Continue?", () => {
//     if (history) history.back()
//     else window.close()
// })

// if (window.innerWidth <= 640) {
//     customAlert("Sorry, Desktop Supported Website, Proceed to Continue?", (cancel, confirm) => {
//         cancel(() => {
//             close()
//         })
//     })
// }