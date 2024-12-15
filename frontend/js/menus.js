const settings_menu = document.getElementById("settings-menu");
const info_menu = document.getElementById("info-menu");
const background = document.getElementById("blur-when-menus-open");

window.open_settings = function(req_element)
{
    let element;
    if (req_element == "settings")
    {
        element = settings_menu;
    }
    else
    {
        element = info_menu;
    }

    element.style.display = "inline"

    // here so opacity animations actually work
    setTimeout(() => {
        element.style.opacity = 1
    }, 10)

    background.style.filter = "blur(3.5px)"
}

window.close_settings = function(req_element)
{
    let element;
    if (req_element == "settings")
    {
        element = settings_menu;
    }
    else
    {
        element = info_menu;
    }

    element.style.opacity = 0

    // here so opacity animations actually work
    setTimeout(() => {
        element.style.display = "none"
    }, 300)

    console.log(element);

    background.style.filter = "blur(0px)"
}