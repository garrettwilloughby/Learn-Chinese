from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import CardSerializer, CreateCardSerializer
from .models import Card
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class CardView(generics.CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class CreateCardView(APIView):
    serializer_class = CreateCardSerializer
    # can override any method with APIView

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            chinese = serializer.data.get('chinese')
            translation = serializer.data.get('translation')
            pinyin = serializer.data.get('pinyin')
            queryset = Card.objects.filter(chinese=chinese)
            if queryset.exists():
                card = queryset[0]
                card.translation = translation
                card.pinyin = pinyin
                card.save(update_fields=['translation', 'pinyin'])
            else:
                card = Card(chinese=chinese,
                            translation=translation, pinyin=pinyin)
                card.save()

            # should return json
            return Response(CardSerializer(card).data, status=status.HTTP_200_OK)


def main(request):
    return HttpResponse("Hello")
