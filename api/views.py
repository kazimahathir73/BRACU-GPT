from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Chat
from .serializers import UserSerializer, ChatSerializer
from django.contrib.auth.hashers import make_password, check_password

@api_view(['POST'])
def signup(request):
    data = request.data
    data['password'] = make_password(data['password'])
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    try:
        user = User.objects.get(email=data['email'])
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_404_NOT_FOUND)
    
    if check_password(data['password'], user.password):
        return Response({'message': 'Login successful', 'user_id': user.user_id})
    return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def chat(request):
    user = User.objects.get(user_id=request.data['user_id'])
    chat = Chat(user=user, chat_question=request.data['chat_question'], chat_response="Sample Response")
    chat.save()
    serializer = ChatSerializer(chat)
    return Response(serializer.data, status=status.HTTP_201_CREATED)