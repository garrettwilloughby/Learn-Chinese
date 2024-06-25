from django.db import models

# Create your models here.


class Card(models.Model):
    chinese = models.CharField(max_length=255, default="")
    translation = models.CharField(max_length=255, default="")
    pinyin = models.CharField(max_length=255, default="")
    created_on = models.DateTimeField(auto_now_add=True)
