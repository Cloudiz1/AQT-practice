import {generate_single, populate_text_area, shuffle_array, init} from "./helpers.js"

init()

let current_question;
let showing_answer = false;

window.get_next_question = function() {
    current_question = generate_single()
    populate_text_area(current_question.question)
    showing_answer = false;
}

window.flip_card = function() {
    if (showing_answer) {
        populate_text_area(current_question.question)
        showing_answer = false;
    }
    else {
        populate_text_area(current_question.answer)
        showing_answer = true;
    }
}

document.getElementById("flashcard").addEventListener("click", flip_card)

get_next_question() // generates first question