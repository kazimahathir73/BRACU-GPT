from transformers import T5ForConditionalGeneration, T5Tokenizer

model = T5ForConditionalGeneration.from_pretrained('path')
tokenizer = T5Tokenizer.from_pretrained('path')

def generate_response(question):
    input_text = f"question: {question} </s>"
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    
    outputs = model.generate(input_ids)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return answer


question = "What is the capital of France?"
answer = generate_response(question)
print(f"Question: {question}")
print(f"Answer: {answer}")
