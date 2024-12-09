import {themes, keys} from "../data/theme_data.js"
let mode = "light"

const themes_div = document.getElementById("theme-buttons-div")
const flashcard = document.getElementById("flashcard")
const buttons = document.getElementsByClassName("button")
const menus = document.getElementsByClassName("menu")

for (let i = 0; i < 10; i++)
{
    let key = keys[i];
    let theme_button = document.createElement("button");
    theme_button.classList.add("theme-button");
    theme_button.style.background = themes[i][key][mode]["primary"]; // eventually replace "light" with the mode once that eventually gets implemented
    theme_button.onclick = function() {change_theme(i)}
    themes_div.appendChild(theme_button);
}

window.change_theme = function(index) {
    let key = keys[index];
    let new_theme = themes[index][key][mode]

    document.body.style.background = new_theme['background']
    flashcard.style.background = new_theme['primary']

    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].style.background = new_theme['primary'];
    }

    for (let i = 0; i < menus.length; i++)
    {
        menus[i].style.background = new_theme['menus'];
    }
}

console.log(themes)