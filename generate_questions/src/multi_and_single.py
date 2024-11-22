from pypdf import PdfReader
from helpers import *
import json

file_name = "ssnct"

text = ""
reader = PdfReader("../pdfs/" + file_name + ".pdf")
number_of_pages = len(reader.pages)

for i in range(number_of_pages):
    page = reader.pages[i]
    text += page.extract_text()

text = text.encode("utf-8", errors="ignore").decode("utf-8")
text = text.replace("\n", "")
text = text.replace("“", '"').replace("”", '"')
text = text.replace("‘", "'").replace("’", "'")
text = text.replace("–", "-").replace("—", "-")
text = text.replace("×", "*")
    
questions = text.split("<")

multi = []
single = []
for question in questions:
    if "A." in question and "B." in question and "C." in question:
        multi.append(question)
        
    else:
        single.append(question)
        
# del single[0] # gets rid of text before the first question

cleaned_single = clean_question_list(single)
cleaned_multi = clean_question_list(multi)

single_objs = []
for i in range(len(cleaned_single)):
    single_objs.append(seperate_answer(cleaned_single[i]).to_dict())

multi_objs = []
for i in range(len(cleaned_multi)):
    multi_objs.append(seperate_multi_questions(cleaned_multi[i]).to_dict())
    
with open("../output/multis/" + file_name + "_multi.json", "w") as f:
    input_string = {
        "questions": multi_objs
    }
    
    json.dump(input_string, f, indent=2, ensure_ascii=False)
    
with open("../output/singles/" + file_name + "_single.json", "w") as f:
    input_string = {
        "questions": single_objs
    }
    
    json.dump(input_string, f, indent=2, ensure_ascii=False)
    