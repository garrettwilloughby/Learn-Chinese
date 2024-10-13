from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import CardSerializer, CreateCardSerializer, UpdateCardSerializer
from .models import Card
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@api_view(['GET'])
def CardView(request):
    try:
        queryset = Card.objects.all()
        serializer_class = CardSerializer(queryset, many=True)
        return Response(serializer_class.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['PUT'])
def UpdateCardView(request):
    # Extract the 'english' field from the request data
    id = request.data.get('id')

    if not id:
        return Response({'error': 'English term is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch the card using the 'english' field
        card = Card.objects.get(id=id)
    except Card.DoesNotExist:
        return Response({'error': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)

    # Pass the existing card instance and the new data to the serializer
    serializer = UpdateCardSerializer(card, data=request.data)

    # Validate and update the card if the data is valid
    if serializer.is_valid():
        serializer.save()  # This will update the existing card
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Return validation errors if the data is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def CreateCardView(request):
    serializer = CreateCardSerializer(data=request.data)
    if serializer.is_valid():
        # Extract validated data from serializer
        chinese = serializer.validated_data.get('chinese')
        translation = serializer.validated_data.get('translation')
        pinyin = serializer.validated_data.get('pinyin')
        ease = serializer.validated_data.get('ease')
        repetition = serializer.validated_data.get('repetition')
        interval = serializer.validated_data.get('interval')

        # Check if the card already exists
        card, created = Card.objects.get_or_create(
            chinese=chinese, defaults={'translation': translation, 'pinyin': pinyin, 'ease': ease, 'repetition': repetition, 'interval': interval})

        # If the card exists, update its fields
        if not created:
            card.translation = translation
            card.pinyin = pinyin
            card.ease = ease
            card.repetition = repetition
            card.interval = interval
            card.save(update_fields=['translation',
                      'pinyin', 'ease', 'repetition', 'interval'])

        # Return serialized data of the card
        return Response(CardSerializer(card).data, status=status.HTTP_200_OK)

    # If serializer is not valid, return errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
def DeleteAllCards(request):
    Card.objects.all().delete()


def main(request):
    return HttpResponse("Hello")
