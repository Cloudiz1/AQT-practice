import {singles, multis} from "./data.js"

function generate_single()
{
    let index = Math.floor(Math.random() * singles.length)
    return singles[index]
}

function populate_text_area(input_text)
{
    let text_area = document.getElementById("text-area")
    text_area.innerText = input_text
}

function shuffle_array(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function init() {
    shuffle_array(singles)
    shuffle_array(multis)
}

export {
    generate_single,
    populate_text_area,
    shuffle_array,
    init
}