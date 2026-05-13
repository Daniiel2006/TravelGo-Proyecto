from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Viajes
from .serializers import ViajeSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def obtener_viaje_detalle(request, viaje_id):
    nombre_limpio = viaje_id.strip().replace('/', '')

    try:
        viaje = Viajes.objects.get(nombre__iexact=nombre_limpio)
        serializer = ViajeSerializer(viaje)
        return Response(serializer.data)
    except Viajes.DoesNotExist:
        return Response({'error': f'El viaje {nombre_limpio} no existe en la DB'}, status=404)