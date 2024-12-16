import {singles, multis} from "../data/data.js"

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

let index = -1; // accounts for the first generate questions call
let all_questions;

function generate_next_question()
{
    index += 1;
    return all_questions[index];
}

function generate_prev_question() {
    if (index == 0)
    {
        alert("Can not go back any further.")
        return singles[0]
    }

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

function shuffle_array(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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

    all_questions = singles.concat(multis)

    shuffle_array(singles)
    shuffle_array(multis)
    shuffle_array(all_questions)

    index = -1;
}

export {
    generate_next_question,
    populate_text_area,
    shuffle_array,
    generate_prev_question,
    populate_prompt_area,
    init_flashcards
}