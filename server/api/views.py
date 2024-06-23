from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import CardSerializer
from .models import Card

# Create your views here.


class CardView(generics.CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


def main(request):
    return HttpResponse("Hello")
