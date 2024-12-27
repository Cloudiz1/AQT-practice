import os 
import json

def compile_jsons():
    multis_dir = "../output/multis/"
    singles_dir = "../output/singles/"

    multis_paths = os.listdir(multis_dir)
    singles_paths = os.listdir(singles_dir)

    def combine_jsons(directory, files):
        questions = []

        for file_name in files:
            with open(directory + file_name, "r", encoding="utf-16") as f:
                data = json.load(f)
                data = data["questions"]
                
                for question in data:
                    questions.append(question)
                    
        return questions
    
    with open("../output/questions.json", "w", encoding="utf-16") as f:
        json_string = {
            "multis": combine_jsons(multis_dir, multis_paths),
            "singles": combine_jsons(singles_dir, singles_paths)
        }
        
        json.dump(json_string, f, indent=2, ensure_ascii=False)