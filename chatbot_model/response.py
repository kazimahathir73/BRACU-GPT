def get_response(query):
    import pandas as pd
    from sentence_transformers import SentenceTransformer, util
    import os
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir,'weights')
    csv_path = os.path.join(base_dir, 'university_queries_demo_data_csv.csv')
    df = pd.read_csv(csv_path)

    model = SentenceTransformer(model_path)
    answer_sentences = df['Answer'].tolist()
    answer_embeddings = model.encode(answer_sentences, convert_to_tensor=True)
    query_embedding = model.encode(query, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, answer_embeddings)
    most_similar_idx = scores.argmax()
    return answer_sentences[most_similar_idx]