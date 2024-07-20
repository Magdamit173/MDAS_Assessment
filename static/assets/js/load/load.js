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

    try {
        isSettingCounter = parseFloat(await getLocalStorage("isSettingCounter")) || isSettingCounter
    }
    catch {

    }

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

    // located at countdown.js username, password
    username_input.value = await getLocalStorage("username_input")
    password_input.value = await getLocalStorage("password_input")
})()

window.addEventListener("offline", () => {
    customAlert("Seems Offline, \nRefresh(cancel) or Proceed(confirm)",(cancel, okay) => {
        cancel(() => {
            location.reload()
        })
        okay(() => {

        })
    })
})


async function fetchDataAndUpdate() {
    try {
        const response = await fetch('/api/get_records')
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        let data = await response.json()

        // Sort data based on the sum of countdown_... fields
        data.sort((a, b) => {
            let sumA = 0, sumB = 0
            for (const key in a) {
                if (key !== '_id' && key !== 'username' && key !== 'password') {
                    sumA += parseFloat(a[key])
                }
            }
            for (const key in b) {
                if (key !== '_id' && key !== 'username' && key !== 'password') {
                    sumB += parseFloat(b[key])
                }
            }
            return sumB - sumA // Sort in descending order
        })

        rank_wrapper.replaceChildren()
        
        // Limit to the first 10 records
        data = data.slice(0, 10)
        data.forEach(record => {
            const div = document.createElement('div')
            const h3 = document.createElement('h3')
            h3.textContent = `${record.username}'s rate/mins`
            div.appendChild(h3)

            const ul = document.createElement('ul')
            for (const [key, value] of Object.entries(record)) {
                if (key !== '_id' && key !== 'username' && key !== 'password') {
                    const li = document.createElement('li')
                    li.textContent = `${key}: ${parseFloat(value) * 60}`
                    ul.appendChild(li)
                }
            }
            div.appendChild(ul)
            rank_wrapper.appendChild(div)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
