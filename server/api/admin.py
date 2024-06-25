from django.contrib import admin

# Register your models here.
from .models import Card


class CardAdmin(admin.ModelAdmin):
    fields = ('chinese', 'translation', 'pinyin', 'created_on')
    list_display = ['id', 'chinese', 'translation', 'pinyin', 'created_on']


admin.site.register(Card, CardAdmin)
