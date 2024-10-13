# stores all urls local to this app
from django.urls import path
from .views import CardView, CreateCardView, DeleteAllCards, UpdateCardView


urlpatterns = [
    path('Card/', CardView, name='Card'),
    path('Card/Create', CreateCardView, name='CreateCard'),
    path('Card/DeleteAll', DeleteAllCards, name='DeleteAllCards'),
    path('Card/Update', UpdateCardView, name='UpdateCardView'),

]
