import pandas as pd
from sentence_transformers import SentenceTransformer, util

model_path = 'E:/BRACU-GPT/chatbot_model/weights'
model = SentenceTransformer(model_path)

df = pd.read_csv("E:/BRACU-GPT/chatbot_model/university_queries_demo_data_csv.csv")

answer_sentences = df['Answer'].tolist()
answer_embeddings = model.encode(answer_sentences, convert_to_tensor=True)

def get_response(query):
    query_embedding = model.encode(query, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, answer_embeddings)
    most_similar_idx = scores.argmax()
    return answer_sentences[most_similar_idx]