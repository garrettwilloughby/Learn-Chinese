# stores all urls local to this app
from django.urls import path
from .views import CardView, CreateCardView


urlpatterns = [
    path('Card', CardView.as_view()),
    path('Card/Create', CreateCardView.as_view())

]
