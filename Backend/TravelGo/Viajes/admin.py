from django.contrib import admin
from .models import Viajes

@admin.register(Viajes)
class ViajeAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio')
    search_fields = ('nombre',)