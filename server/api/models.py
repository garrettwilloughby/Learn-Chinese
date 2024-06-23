from django.db import models

# Create your models here.


class Card(models.Model):
    chinese = models.CharField(max_length=255),
    translation = models.CharField(max_length=255),
    pinyin = models.CharField(max_length=255),
    created_on = models.DateTimeField(auto_now_add=True)
