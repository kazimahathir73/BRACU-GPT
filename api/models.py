from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email

class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat_question = models.TextField()
    chat_response = models.TextField()

    def __str__(self):
        return f"Chat by {self.user.email}"