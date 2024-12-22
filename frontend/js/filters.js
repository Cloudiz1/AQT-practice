import {remove_type, add_type} from "./flashcard.js"
import {read_cookie} from "./cookies.js"

const singles_checkbox = document.getElementById("singles-checkbox")
const multis_checkbox = document.getElementById("multis-checkbox")

singles_checkbox.addEventListener("change", () => {
    if (singles_checkbox.checked)
    {
        add_type("single")
    }
    else
    {
        remove_type("single")
    }
})

multis_checkbox.addEventListener("change", () => {
    if (multis_checkbox.checked)
    {
        add_type("multi")
    }
    else
    {
        remove_type("multi")
    }
})

function init_filters() {
    let question_types = read_cookie("question_types").split(",");

    if (question_types.includes("single"))
    {
        singles_checkbox.checked = true;
    }

    if (question_types.includes("multi"))
    {
        multis_checkbox.checked = true;
    }
}

export {
    init_filters
}