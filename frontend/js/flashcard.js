import {singles, multis} from "./init.js";
import {read_cookie, set_cookie} from "./cookies.js"
let all_questions = [];
let index;

class Single_Question {
    constructor(type, question, answer)
    {
        this.type = type
        this.question = question
        this.answer = answer
    }
}

class Multi_Question {
    constructor(type, prompt, A, B, C)
    {
        this.type = type
        this.prompt = prompt
        this.A = A
        this.B = B
        this.C = C
    }
}

function obj_to_question_class(question)
{
    if (question.hasOwnProperty("prompt"))
    {
        let A = new Single_Question("single", question.A.question, question.A.answer)
        let B = new Single_Question("single", question.B.question, question.B.answer)
        let C = new Single_Question("single", question.C.question, question.C.answer)
        return new Multi_Question("multi", question.prompt, A, B, C)
    }

    return new Single_Question("single", question.question, question.answer)
}

function shuffle_array(array) {
    for (let iter = 0; iter < 5; iter++)
    {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

function generate_next_question()
{
    index += 1;

    if (index >= all_questions.length)
    {
        index = 0;
    }

    return all_questions[index];
}

function generate_prev_question() {
    index -= 1;
    return all_questions[index];
}

function populate_text_area(input_text)
{
    document.getElementById("text-area").innerText = input_text
}

function populate_prompt_area(input_text)
{
    document.getElementById("prompt-area").innerText = input_text
}

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
    if (all_questions.length == 0)
    {
        populate_text_area("You unchecked all the filters, what did you expect?")
        populate_prompt_area("")
        return
    }

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
    if (all_questions.length == 0)
    {
        alert("So like, what did you expect?")
        return
    }

    if (index == 0 && multi_question_index <= 0)
    {
        alert("Can not go back any further.")
        return
    }

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
    if (all_questions.length > 0)
    {
        if (showing_answer) {
            populate_text_area(get_question_from_index(multi_question_index).question)
            showing_answer = false;
        }
        else {
            populate_text_area(get_question_from_index(multi_question_index).answer)
            showing_answer = true;
        }
    }
}

function init_flashcards() {
    for (let i = 0; i < singles.length; i++)
    {
        singles[i] = obj_to_question_class(singles[i])
    }

    for (let i = 0; i < multis.length; i++)
    {
        multis[i] = obj_to_question_class(multis[i])
    }

    let question_types = read_cookie("question_types")
    if (question_types == "")
    {
        return
    }

    if (question_types.includes("single"))
    {
        all_questions = all_questions.concat(singles)
    }

    if (question_types.includes("multi"))
    {
        all_questions = all_questions.concat(multis)
    }

    shuffle_array(all_questions)
    index = -1;

    console.log(all_questions.length)
}

function refresh_flashcards()
{
    index = -1;
    multi_question_index = -1;
    shuffle_array(all_questions)
    get_next_question()
}

function remove_type(req_type) {
    for (let i = all_questions.length - 1; i >= 0; i--)
    {
        if (all_questions[i].type == req_type)
        {
            all_questions.splice(i, 1);
        }
    }

    let cookie_value = read_cookie("question_types").replaceAll(req_type, "").replaceAll(",", "")
    set_cookie("question_types", cookie_value);

    refresh_flashcards()
}

function add_type(req_type) {
    if (req_type == "single")
    {
        all_questions = all_questions.concat(singles)
    }

    if (req_type == "multi")
    {
        all_questions = all_questions.concat(multis)
    }

    let cookie_value = read_cookie("question_types") 
    if (cookie_value != "")
    {
        cookie_value += ","
    }
    cookie_value += req_type

    set_cookie("question_types", cookie_value)

    refresh_flashcards()
}

document.getElementById("flashcard").addEventListener("click", flip_card)

export {
    init_flashcards,
    remove_type,
    add_type
}