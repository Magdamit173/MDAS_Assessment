function assessByMDAS() {
    const expression = generateMDASExpression(e_minnumber, e_maxnumber + 1, randint(0, e_terms), randint(0, e_terms), randint(0, e_terms), randint(0, e_terms))    

    e_answer = math.evaluate(expression)
    e_text_answer = `${expression.replace(/\*/g, 'x')}`
}

function configMDAS() {
    e_assess_operation = assessByMDAS
}

function generateMDASExpression(min, max, numMultiplications = 1, numDivisions = 1, numAdditions = 1, numSubtractions = 1) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const operators = []
    operators.push(...Array(numMultiplications).fill('*'))
    operators.push(...Array(numDivisions).fill('/'))
    operators.push(...Array(numAdditions).fill('+'))
    operators.push(...Array(numSubtractions).fill('-'))

    let expression = `${getRandomInt(min, max)}`

    while (operators.length > 0) {
        const randomIndex = getRandomInt(0, operators.length - 1)
        const operator = operators.splice(randomIndex, 1)[0]
        const operand = getRandomInt(min, max)

        expression += ` ${operator} ${operand}`
    }

    return expression
}

