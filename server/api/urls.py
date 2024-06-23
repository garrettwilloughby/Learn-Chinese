# stores all urls local to this app
from django.urls import path
from .views import CardView

urlpatterns = [
    path('', CardView.as_view())
]
