from django.urls import path
from .views import signup, login, chat, get_chats_by_user

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('chat/', chat, name='chat'),
    path('api/chats/<int:user_id>/', get_chats_by_user, name='get_chats_by_user'),
]