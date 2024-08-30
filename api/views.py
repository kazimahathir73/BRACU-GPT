from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Chat
from .serializers import UserSerializer, ChatSerializer
from django.contrib.auth.hashers import make_password, check_password
from chatbot_model.response import get_response

@api_view(['POST'])
def signup(request):
    data = request.data
    data['password'] = make_password(data['password'])
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Signup successful',
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    try:
        user = User.objects.get(email=data['email'])
    except User.DoesNotExist:
        return Response({'error': 'No email exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    if check_password(data['password'], user.password):
        return Response({'message': 'Login successful', 'user_id': user.user_id})
    return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def chat(request):
    try:
        user = User.objects.get(user_id=request.data['user_id'])
        question = request.data['chat_question']
        answer = get_response(question)
        chat = Chat(user=user, chat_question=question, chat_response=answer)
        chat.save()
        serializer = ChatSerializer(chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_chats_by_user(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
        chats = Chat.objects.filter(user=user)
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
