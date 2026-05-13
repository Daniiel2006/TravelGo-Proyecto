from rest_framework import serializers
from .models import Viajes

class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viajes
        fields = '__all__'