const settings_menu = document.getElementById("settings-menu");
const background = document.getElementById("blur-when-menus-open");

window.open_settings = function()
{
    settings_menu.style.display = "inline"

    // here so opacity animations actually work
    setTimeout(() => {
        settings_menu.style.opacity = 1
    }, 10)

    background.style.filter = "blur(3.5px)"
}

window.close_settings = function()
{
    settings_menu.style.opacity = 0

    // here so opacity animations actually work
    setTimeout(() => {
        settings_menu.style.display = "none"
    }, 300)

    background.style.filter = "blur(0px)"
}