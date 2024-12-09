import {generate_next_question, generate_prev_question, populate_text_area, populate_prompt_area, init} from "./flashcard_helpers.js"

init()

let current_question;
let showing_answer = false;
let multi_question_index = -1; // -1 = single question, 0 = A, 1 = B, 2 = C

function get_question_from_index(index)
{
    switch (index)
    {
        case -1:
            return current_question

        case 0:
            return current_question.A

        case 1:
            return current_question.B

        case 2:
            return current_question.C
    }
}

window.get_next_question = function()
{
    if (multi_question_index >= 0) 
    {
        multi_question_index += 1
    }
    
    if (multi_question_index > 2 || multi_question_index == -1)
    {
        current_question = generate_next_question()
        if (current_question.hasOwnProperty("prompt"))
        {
            populate_prompt_area("Question prompt: " + current_question.prompt)
            multi_question_index = 0
        }
        else
        {
            populate_prompt_area("")
            multi_question_index = -1
        }
    }

    populate_text_area(get_question_from_index(multi_question_index).question)

    showing_answer = false
}

window.get_previous_question = function() 
{
    multi_question_index -= 1

    if (multi_question_index < 0) { // at the end of multi question or its a single question
        current_question = generate_prev_question()
        if (current_question.hasOwnProperty("prompt"))
        {
            populate_prompt_area("Question prompt: " + current_question.prompt)
            multi_question_index = 2
        }
        else
        {
            populate_prompt_area("")
            multi_question_index = -1
        }
    }

    populate_text_area(get_question_from_index(multi_question_index).question)
    showing_answer = false
}

window.flip_card = function() {
    if (showing_answer) {
        populate_text_area(get_question_from_index(multi_question_index).question)
        showing_answer = false;
    }
    else {
        populate_text_area(get_question_from_index(multi_question_index).answer)
        showing_answer = true;
    }
}

document.getElementById("flashcard").addEventListener("click", flip_card)

get_next_question() // generates first question