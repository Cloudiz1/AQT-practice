import {generate_next_question, get_prev_question, populate_text_area, populate_prompt_area, init} from "./helpers.js"

init()

let current_question;
let showing_answer = false;
let multi_question_index = -1; // -1 = single question, 0 = A, 1 = B, 2 = C

document.get_next_question() = function()
{
    if (multi_question_index == 2 || multi_question_index == -1)
    {
        current_question = generate_next_question()
        if (current_question.hasOwnProperty("prompt"))
        {
            populate_prompt_area("Question prompt: " + current_question.prompt)
            multi_question_index = 0
        }
    }

    if (multi_question_index == -1)
    {
        populate_text_area(question.question)
        showing_answer = false
    }
}

// window.get_next_question = function() {
//     current_question = generate_next_question()
//     let prompt_area = document.getElementById("prompt-area")
    
//     if (current_question.hasOwnProperty("prompt"))
//     {
//         prompt_area.innerText = "Question Prompt: " + current_question.prompt
//         showing_mutli_question = true;
//     }
//     else
//     {
//         prompt_area.innerText = ""
//         showing_mutli_question = false;
//     }
    
//     populate_text_area(current_question.question)
//     showing_answer = false;
// }

// window.get_previous_question = function() {
//     current_question = get_prev_question()
//     populate_text_area(current_question.question)
//     showing_answer = false
// }

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