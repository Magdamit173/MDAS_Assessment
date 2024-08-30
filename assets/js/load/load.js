(async () => {
    // file order is important
    // load predefined numbers by user
    e_minnumber = parseFloat(await getLocalStorage("e_minnumber")) || e_minnumber
    e_maxnumber = parseFloat(await getLocalStorage("e_maxnumber")) || e_maxnumber
    e_terms = parseFloat(await getLocalStorage("e_terms")) || e_terms
    e_mintarget_number = parseFloat(await getLocalStorage("e_mintarget_number")) || e_mintarget_number
    e_maxtarget_number = parseFloat(await getLocalStorage("e_maxtarget_number")) || e_maxtarget_number
    e_number_steps = parseFloat(await getLocalStorage("e_number_steps")) || e_number_steps
    e_number_type = (await getLocalStorage("e_number_type")) || e_number_type

    minnumber_input.value = e_minnumber
    maxnumber_input.value = e_maxnumber
    terms_input.value = e_terms
    mintarget_input.value = e_mintarget_number
    maxtarget_input.value = e_maxtarget_number
    number_steps.value = e_number_steps
    number_type.value = e_number_type

    e_countdown = parseFloat(await getLocalStorage("e_countdown")) || e_countdown
    countdown_number.value = e_countdown

    has_countdown.checked = parseInt(await getLocalStorage("has_countdown")) || has_countdown.checked

    // activity.js "isSettingCounter"

    // isSettingCounter = parseFloat(await getLocalStorage("isSettingCounter")) || isSettingCounter

    // fetch words
    // word_list = (await retrieveContent("./assets/lexicon/words.txt")).trim().split("\n")

    has_target_number.checked = parseInt(await getLocalStorage("has_target_number")) || has_target_number.checked
    repeat_itself.checked = parseInt(await getLocalStorage("repeat_itself")) || repeat_itself.checked

    e_answer_queue_volume = parseFloat(await getLocalStorage("e_answer_queue_volume")) || e_answer_queue_volume
    e_countdown_queue_volume = parseFloat(await getLocalStorage("e_countdown_queue_volume")) || e_countdown_queue_volume

    answer_queue_volume.value = e_answer_queue_volume
    countdown_queue_volume.value = e_countdown_queue_volume

    // TODO unexpected behaviour

    const is_answer_queue_muted = parseInt(await getLocalStorage("e_has_answer_queue"))
    const is_countdown_queue_muted = parseInt(await getLocalStorage("e_has_countdown_queue"))
    has_answer_queue.checked = isNaN(is_answer_queue_muted) ? 1 : is_answer_queue_muted
    has_countdown_queue.checked = isNaN(is_countdown_queue_muted) ? 1: is_countdown_queue_muted
    correct_audio_source.muted = isNaN(is_countdown_queue_muted) ? 0 : !is_answer_queue_muted
    has_countdown_queue.muted = isNaN(is_countdown_queue_muted) ? 0: !is_countdown_queue_muted
})()

setTimeout(async () => {
    
    if (!(await getLocalStorage("content"))) {
        customAlert("Inactive Content, To be Continued on My Free Time <3, I have more things to do",async (cancel, okay) => {
            await setLocalStorage("content", 1)
        })
    }
}, 2000)

window.addEventListener("offline", () => {
    customAlert("Seems Offline, \nRefresh(cancel) or Proceed(confirm)",(cancel, okay) => {
        cancel(() => {
            location.reload()
        })
        okay(() => {

        })
    })
})
