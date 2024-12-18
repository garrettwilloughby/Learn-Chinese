from rest_framework import serializers
from .models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'chinese', 'translation', 'pinyin',
                  'ease', 'repetition', 'interval', 'created_on')


class UpdateCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('chinese', 'translation', 'pinyin',
                  'ease', 'repetition', 'interval')


class CreateCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('chinese', 'translation', 'pinyin',
                  'ease', 'repetition', 'interval')
