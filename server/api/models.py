from django.db import models

# Create your models here.


class Card(models.Model):
    chinese = models.CharField(max_length=255, null=False, unique=True)
    translation = models.CharField(max_length=255, null=False)
    pinyin = models.CharField(max_length=255, null=False)
    ease = models.FloatField(default=2.5, null=False)
    repetition = models.PositiveBigIntegerField(default=0, null=False)
    interval = models.PositiveBigIntegerField(default=1, null=False)
    created_on = models.DateTimeField(auto_now_add=True, null=False)
