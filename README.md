## AQT Quiz web app
This is a simple web app which converts the sample questions (in the form of pdfs) from the NAQT website to flash cards

## TODO:
- three more pdfs to convert (as they have a different format from the rest)
- make a better shuffle function
- mobile ui
- better themes (hopefully)
- bug fixes :(
- maybe an index to tell you how many questions you have left and where you're at 

## Done:
- converted most pdfs to questions
- basic quizzing
- light mode themes
- cookies
- basic design
- utf-16 support (this literally took five years off my life)
- info dialogue
- move dark mode button to top navbar
- decorations
    - fonts
    - hover animations
    - dark mode themes
- filters

## bugs:
- msnct Q 21. has a weird edge case where the answer has the initial C., which breaks the parsing function
- `cookies.js` doesnt check if a cookie exists prior to reading (fixed)
- weird bug where going to previous question on index 0 generates a question out of literally nowhere???
    - like i had single part questions unchecked and it still generated one
    - its also always the exact same card????