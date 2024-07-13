function assessByPrime() {
    const chosen_number = randint(e_minnumber, e_maxnumber + 1)

    e_answer = is_prime(chosen_number)
    e_text_answer = `${chosen_number}'`
}

function configPrime() {
    e_assess_operation = assessByPrime
}

function is_prime(n) {
    // Thanks to: https://www.grepper.com/answers/204945/Javascript+prime+number+check

    if (n < 3) return n > 1;
    else if (n % 2 === 0 || n % 3 === 0) return false;
    else if (n < 25) return true;
    let i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}
