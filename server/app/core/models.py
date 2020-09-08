from django.conf import settings
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.name}"


class Stream(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=False, related_name='streams')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='categories', null=True)
    title = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.title} | {self.user} | {self.category}"
