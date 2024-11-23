## things to fix
- `get_next_question()` and `get_previous_question` maybe should be one function with an input flag in `helpers.js`
- fix the same two functions on the `main.js`
- don't call `generate_question` everytime 

### on input:
- check for `next answer` or `prev answer`
- check if we are currently in a multi part question
    - if true, only change `multi_question_index` unless we are at the start and we need to go back or we are at the end and need to go forward
        - call `get_sub_question()`
        - also populate `prompt-area`
    - else, increment `index` and call `get_question()` 

- once question is fetched, call `populate_text_area()`

