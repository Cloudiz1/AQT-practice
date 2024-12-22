import {themes} from "./init.js"
import {set_cookie, read_cookie} from "./cookies.js"
let mode = "light"
let curr_color_index = 0;

let theme_buttons = []
let theme_elements = []; // elements that have to switch to and from light mode/darkmode
const keys = ["red", "green", "blue", "purple", "pink", "tan", "default"]
const themes_div = document.getElementById("theme-buttons-div")
const flashcard = document.getElementById("flashcard")
const buttons = document.getElementsByClassName("button")
const menus = document.getElementsByClassName("menu")
const moon_icon = document.getElementById("moon-icon")

const icons = document.getElementsByClassName("icon")
const button_icons = document.getElementsByClassName("button-icon")
const text = document.getElementsByTagName("p")
const labels = document.getElementsByTagName("label")
const headers = document.getElementsByTagName("h2")

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
    set_cookie("color_index", index);
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

window.change_mode = function(change_to = null)
{
    if (change_to == mode)
    {
        return;
    }

    if (mode == "light")
    {
        set_cookie("mode", "dark");
        mode = "dark";
        moon_icon.classList.remove("light-mode");
        moon_icon.classList.add("dark-mode");
        ARCforarray(icons, "dark-mode", "light-mode");
        ARCforarray(button_icons, "dark-mode", "light-mode");
        ARCforarray(text, "dark-mode", "light-mode");
        ARCforarray(headers, "dark-mode", "light-mode");
        ARCforarray(labels, "dark-mode", "light-mode")
    }
    else
    {
        set_cookie("mode", "light");
        mode = "light";
        moon_icon.classList.remove("dark-mode");
        moon_icon.classList.add("light-mode");
        ARCforarray(icons, "light-mode", "dark-mode");
        ARCforarray(button_icons, "light-mode", "dark-mode");
        ARCforarray(text, "light-mode", "dark-mode");
        ARCforarray(headers, "light-mode", "dark-mode");
        ARCforarray(labels, "light-mode", "dark-mode");
    }

    change_theme(curr_color_index);
    set_theme_button_bg()
}

function init_themes()
{
    for (let i = 0; i < keys.length; i++)
        {
            let theme_button = document.createElement("button");
            theme_button.classList.add("theme-button");
            theme_button.onclick = function() {change_theme(i)}
            themes_div.appendChild(theme_button);
            theme_buttons.push(theme_button);
        }
        
    change_theme(read_cookie("color_index"));
    change_mode(read_cookie("mode"));

    set_theme_button_bg()
}

// updates theme colors when the mode switches
function set_theme_button_bg() {
    for (let i = 0; i < theme_buttons.length; i++)
    {
        let key = keys[i];
        theme_buttons[i].style.background = themes[i][key][mode]["primary"];
    }
}

export {
    init_themes,
    keys
}