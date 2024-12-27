from pypdf import PdfReader
from helpers import *
import json 
import re

path: str = "../pdfs/"
out_path: str = "../output/singles/"

def split_questions(file_name: str, clean_list: bool = True) -> list[str]:
    text: str = ""
    reader: PdfReader = PdfReader(path + file_name)
    numb_pages: int = len(reader.pages)
    
    for i in range(numb_pages):
        page = reader.pages[i]
        text += page.extract_text()
        
    questions: list[str] = text.split("<")
    
    if clean_list:
        questions = clean_question_list(questions)
    
    return questions

def write_json(file_name: str, questions: list[Question]):
    with open(out_path + file_name + "_single.json", "w", encoding="utf-16") as f:
        input_string: object = {
            "questions": questions
        }
        
        json.dump(input_string, f, indent=2, ensure_ascii=False)
    
def speed_check():
    out: list[Question] = [] 
    file_name: str = "speed-check.pdf"
    questions: list[str] = split_questions(file_name)
    
    for question in questions:
        out.append(seperate_answer(question).to_dict())
        
    write_json(file_name.replace(".pdf", ""), out)
        
def lightning():
    out: list[Question] = []
    file_name: str = "lightning.pdf"
    questions: list[str] = split_questions(file_name)
    
    for multi_question in questions:
        multi_question = multi_question.split(" □ □ ")
        
        for question in multi_question:
            if ("answer: " in question):
                out.append(seperate_answer(question[2:]).to_dict())
            
    write_json(file_name.replace(".pdf", ""), out)
    
def tv(): # this one is awful and needs a custom fit clean_list() function due to repeating question numbers (like who thought that was a good idea?)
    out: list[Question] = []
    file_name: str = "tv.pdf"
    questions: list[str] = split_questions(file_name, clean_list=False)
    singles: list[str] = []
    multis: list[str] = []
    
    for question in questions:
        cleaned_question: str = question.replace("\n", "")
        cleaned_question = re.split(r"[0-9]\. ", cleaned_question)
        
        del cleaned_question[0]
        
        cleaned_question = "".join(cleaned_question)
        if cleaned_question == "":
            break
        
        if "A." in question and "B." in question and "C." in question:
            multis.append(cleaned_question.strip())
        else:
            singles.append(cleaned_question.strip())
    
    for multi_question in multis:
        multi_question = multi_question.split(" □ □ ")
        
        for question in multi_question:
            if ("answer: " in question):
                out.append(seperate_answer(question[2:]).to_dict())
    
    for single_question in singles:
        out.append(seperate_answer(single_question).to_dict())
        
    write_json(file_name.replace(".pdf", ""), out)

def quirky_pdfs():
    speed_check()
    lightning()
    tv()