// TODO: temporary feature, fix on free time :)

const equation_table_wrapper = document.querySelector("[data-equation_table_wrapper]")

let t_minnumber = e_minnumber
let t_maxnumber = e_maxnumber
let t_operation = null

function equationCard() {
    const card = document.createElement("div")
    card.setAttribute("class","equation_card")

    return {
        insert(text) {
            const row = document.createElement("div")
            row.innerHTML = `${text}`
    
            card.append(row)
        },
        card : card
    }
}

function wordToSign(operation) {
    switch (operation) {
        case "addition": return "+"
        case "subtraction": return "-"
        case "multiplication": return "x"
        case "division": return "÷"
    }
}

async function processTables(min, max, operation) {
    equation_table_wrapper.replaceChildren()
    
    console.log(operation)
    if (!(/^[+\-x÷]$/).test(operation)) return

    for (let i = min; i <= max; ++i) {
        let equation = equationCard()
        for (let k = min; k <= max; ++k) {
            if (operation != "÷") {
                equation.insert(`${i} ${operation} ${k} = &nbsp;<end>${pickOperation(i,k, operation)}</end>`)
            }
            else if (operation == "÷") {
                equation.insert(`${pickOperation(i,k, "x")} ${operation} ${i} = &nbsp;<end>${k}</end>`)
            }
        }

        equation_table_wrapper.append(equation.card)
    }
}

function pickOperation(f_term, s_term, operation) {
    switch (operation) {
        case "+": return f_term + s_term
        case "-": return f_term - s_term
        case "x": return f_term * s_term
        case "÷": return (f_term * s_term) / f_term
    }
}

// processTables(t_minnumber, t_maxnumber, "x")