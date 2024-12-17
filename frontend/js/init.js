import { init_flashcards } from "./flashcard.js";
import { init_themes } from "./themes.js";

let singles, multis, themes;
const questions_path = "data/questions.json"
const themes_path = "data/theme_data.json"

function read_json(path, mode)
{
    return fetch(path)
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("Response threw error: " + res.status)
        }
        return res.arrayBuffer();
    })
    .then((data) => {
        if (mode == "utf16")
        {
            const decoder = new TextDecoder('utf-16');
            const text = decoder.decode(data);
            return JSON.parse(text);
        }
        
        // i genuinely have no idea why i need this here
        // maybe something to do with BOM???
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(data);
        return JSON.parse(text);
    })
    .catch((err) => {
        throw new Error(err)
    })
}

read_json(themes_path, "utf8")
.then((data) => {
    themes = data;
    init_themes()

    // adds transition style after initial theme init to avoid the background taking extra time to initialize
    setTimeout(() => {
        const all_elements = document.querySelectorAll("*");
        for(let i = 0; i < all_elements.length; i++)
        {
            all_elements[i].style.transition = "all 250ms ease-out";
        }
    }, 25)
})

read_json(questions_path, "utf16")
.then((data) => {
    singles = data["singles"];
    multis = data["multis"];

    init_flashcards()

    get_next_question() // generates first question
})

export {
    singles,
    multis,
    themes
}