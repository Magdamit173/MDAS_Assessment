(async () => {
    // file order is important
    // load predefined numbers by user
    e_minnumber = parseFloat(await getLocalStorage("e_minnumber")) || e_minnumber
    e_maxnumber = parseFloat(await getLocalStorage("e_maxnumber")) || e_maxnumber
    e_terms = parseFloat(await getLocalStorage("e_terms")) || e_terms
    e_mintarget_number = parseFloat(await getLocalStorage("e_mintarget_number")) || e_mintarget_number
    e_maxtarget_number = parseFloat(await getLocalStorage("e_maxtarget_number")) || e_maxtarget_number

    minnumber_input.value = e_minnumber
    maxnumber_input.value = e_maxnumber
    terms_input.value = e_terms
    mintarget_input.value = e_mintarget_number
    maxtarget_input.value = e_maxtarget_number

    e_countdown = parseFloat(await getLocalStorage("e_countdown")) || e_countdown
    countdown_number.value = e_countdown

    has_countdown.checked = parseInt(await getLocalStorage("has_countdown")) || has_countdown.checked

    // activity.js "isSettingCounter"

    isSettingCounter = parseFloat(await getLocalStorage("isSettingCounter")) || isSettingCounter

    // fetch words
    // word_list = (await retrieveContent("./assets/lexicon/words.txt")).trim().split("\n")

    has_target_number.checked = parseInt(await getLocalStorage("has_target_number")) || has_target_number.checked
})()
