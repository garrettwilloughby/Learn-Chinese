from rest_framework import serializers
from .models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'chinese', 'translation', 'pinyin', 'created_on')

# handles the post req


class CreateCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('chinese', 'translation', 'pinyin')
