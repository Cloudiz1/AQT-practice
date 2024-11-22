class Question:
    def __init__(self, question, answer):
        self.question = question
        self.answer = answer
        
    def to_dict(self):
        return {
            "question": self.question,
            "answer": self.answer
        }
        
class Multi_Question:
    def __init__(self, prompt, A, B, C):
        self.prompt = prompt
        self.A = A
        self.B = B
        self.C = C
        
    def to_dict(self):
        return {
            "prompt": self.prompt,
            "A": self.A.to_dict(),
            "B": self.B.to_dict(),
            "C": self.C.to_dict()
        }

def clean_question_list(input_list):
    output_list = []
    for i, question in enumerate(input_list):
        desired_string = str(i + 1) + "."
        cleaned_question = question.split(desired_string)
        
        del cleaned_question[0]
        
        cleaned_question = "".join(cleaned_question)
        output_list.append(cleaned_question.strip())
        
    del output_list[len(output_list) - 1]
    
    return output_list

def seperate_answer(question):
    question = question.split("answer: ")
    return Question(question[0].strip(), question[1].strip())

def seperate_multi_questions(question):
    question = question.split("A.")
    prompt = question[0].strip()
    
    del question[0]
    question = "".join(question)
    question = question.split("B.")
    A = seperate_answer(question[0])
    
    del question[0]
    question = "".join(question)
    question = question.split("C.")
    B = seperate_answer(question[0])
    
    del question[0]
    C = seperate_answer("".join(question))
    
    return Multi_Question(prompt, A, B, C)