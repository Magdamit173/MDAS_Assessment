async function assessByWords() {

    const chosen_word = choice((await retrieveContent(`${location.href.replace(/\/[^/]*$/, '')}/assets/lexicon/words.txt`)).trim().split("\n"))

    e_answer = chosen_word
    e_text_answer = chosen_word
}

function configWords() {
    e_assess_operation = assessByWords
}

