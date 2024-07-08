# stores all urls local to this app
from django.urls import path
from .views import CardView, CreateCardView


urlpatterns = [
    path('Card/', CardView, name='Card'),
    path('Card/Create', CreateCardView, name='CreateCard'),

]
