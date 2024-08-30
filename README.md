# BRACU Helper Chatbot

BRACU Helper is a chatbot designed to assist BRAC University students by providing answers to common queries related to university life. The chatbot is built using Django for the backend and React for the frontend, leveraging a Sentence Transformer model trained on a custom dataset of question-answer pairs.

Video demo - https://youtu.be/ptQbcOdPAa4

## Features

- **Chat Interface**: A user-friendly chat interface where users can ask questions and receive answers.
- **Custom Dataset**: The chatbot is trained on a dataset specifically tailored to BRAC University-related questions.
- **Real-time Responses**: The chatbot uses a Sentence Transformer model to generate responses in real-time.
- **Data Storage**: All user interactions (questions and answers) are stored in a database for future reference.

## Technology Stack

- **Frontend**: React with Material-UI for styling and Framer Motion for animations.
- **Backend**: Django REST Framework for building the API.
- **Deep learning Model**: Sentence Transformer, fine-tuned on a custom dataset.
- **Database**: Django's default SQL database for storing user information and chat logs.

## Project Structure

```
BRACU-Helper/
│
├── api/                     # Django app for backend API
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── backend/                 # Main Django project folder
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── chatbot_model/           # Contains the chatbot model and dataset
│   ├── response.py          # Model handling and response generation
│   ├── weights/             # Pre-trained model weights
│   └── university_queries_demo_data_csv.csv  # Custom dataset
│
├── frontend/                # React app for frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── login.js
│   │   │   ├── signup.js
│   │   │   ├── chats.js
│   │   │   └── ...
|   |   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── ...
│   └── public/
│
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- **Python 3.8+**
- **Node.js and npm**
- **Django**
- **React**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/BRACU-Helper.git
   cd BRACU-Helper
   ```

2. **Backend Setup:**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the Django development server:
     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup:**
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Model Setup:**
   - Ensure the Sentence Transformer model weights are placed in the `chatbot_model/weights` directory.
   - The custom dataset should be available in the `chatbot_model/` directory.

### Usage

1. Access the web application by navigating to `http://localhost:3000` in your browser.
2. Signup or login to start using the chatbot.
3. Ask questions related to BRAC University, and the chatbot will provide answers based on the trained model.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
