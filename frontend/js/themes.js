import {themes, keys} from "../data/theme_data.js"
let mode = "light"
let curr_color_index = 0;

const themes_div = document.getElementById("theme-buttons-div")
const flashcard = document.getElementById("flashcard")
const buttons = document.getElementsByClassName("button")
const menus = document.getElementsByClassName("menu")
const moon_icon = document.getElementById("moon-icon")
const dark_mode_button = document.getElementById("dark-mode-button")
const icons = document.getElementsByClassName("icon")
const button_icons = document.getElementsByClassName("button-icon")
const text = document.getElementsByTagName("p")
const headers = document.getElementsByTagName("h2")

for (let i = 0; i < 10; i++)
{
    let key = keys[i];
    let theme_button = document.createElement("button");
    theme_button.classList.add("theme-button");
    theme_button.style.background = themes[i][key][mode]["primary"]; // eventually replace "light" with the mode once that eventually gets implemented
    theme_button.onclick = function() {change_theme(i)}
    themes_div.appendChild(theme_button);
}

// add + remove class for list
function ARCforarray(array, add, remove)
{
    for (let i = 0; i < array.length; i++)
    {
        array[i].classList.add(add);
        array[i].classList.remove(remove);
    }
}

window.change_theme = function(index) {
    curr_color_index = index;
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

window.change_mode = function()
{
    if (mode == "light")
    {
        mode = "dark";
        moon_icon.classList.remove("light-mode");
        moon_icon.classList.add("dark-mode");
        dark_mode_button.classList.remove("light-mode-button");
        dark_mode_button.classList.add("dark-mode-button");
        ARCforarray(icons, "dark-mode", "light-mode");
        ARCforarray(button_icons, "dark-mode", "light-mode");
        ARCforarray(text, "dark-mode", "light-mode");
        ARCforarray(headers, "dark-mode", "light-mode");
    }
    else
    {
        mode = "light";
        moon_icon.classList.remove("dark-mode");
        moon_icon.classList.add("light-mode");
        dark_mode_button.classList.remove("dark-mode-button");
        dark_mode_button.classList.add("light-mode-button");
        ARCforarray(icons, "light-mode", "dark-mode");
        ARCforarray(button_icons, "light-mode", "dark-mode");
        ARCforarray(text, "light-mode", "dark-mode");
        ARCforarray(headers, "light-mode", "dark-mode");
    }

    change_theme(curr_color_index);
}