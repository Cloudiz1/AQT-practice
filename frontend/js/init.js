import {init_flashcards} from "./flashcard_helpers.js"
import { init_themes } from "./themes.js"

init_flashcards()
init_themes()

// adds transition style after initial theme init to avoid the background taking extra time to initialize
setTimeout(() => {
    const all_elements = document.querySelectorAll("*");
    for(let i = 0; i < all_elements.length; i++)
    {
        all_elements[i].style.transition = "all 250ms ease-out";
    }
}, 25)