from django.urls import path
from .views import signup, login, chat

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('chat/', chat, name='chat'),
]