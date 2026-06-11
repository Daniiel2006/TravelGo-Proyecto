from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Viajes
from .serializers import ViajeSerializer
import urllib.request
import json


@api_view(['GET'])
@permission_classes([AllowAny])
def obtener_viaje_detalle(request, viaje_id):
    nombre_limpio = viaje_id.strip().replace('/', '')

    try:
        # 1. Recuperamos el viaje del Administrador de Django
        viaje = Viajes.objects.get(nombre__iexact=nombre_limpio)
        precio_catalogo = float(viaje.precio)

        # 2. CONEXIÓN A API REAL (Open-Meteo API - Consulta del clima en vivo)
        # Consultamos las condiciones globales actuales
        url_api = "https://api.open-meteo.com/v1/forecast?latitude=40.41&longitude=-3.70&current_weather=true"
        suplemento_dinamico = 45.0  # Valor por si la API falla
        nota_sistema = "Tarifa base de catálogo."

        try:
            req = urllib.request.Request(url_api, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=3) as response:
                data_api = json.loads(response.read().decode())
                # Extraemos la temperatura real de este mismo instante del termómetro de la API
                temp_actual = data_api.get('current_weather', {}).get('temperature', 20)

                # Algoritmo de Tarificación Dinámica: Sumamos la temperatura como suplemento de alta demanda
                suplemento_dinamico = float(temp_actual) + 25.50
                nota_sistema = f"Precio de vuelo dinámico regulado por API externa (Suplemento por demanda climática actual: +{round(suplemento_dinamico, 2)}€)."
        except Exception as e:
            nota_sistema = "Precio dinámico calculado por contingencia del servidor."

        # 3. Sumamos tu precio del admin + el suplemento en tiempo real de la API
        precio_final_dinamico = round(precio_catalogo + suplemento_dinamico, 2)

        # 4. Enviamos los datos a Angular
        serializer = ViajeSerializer(viaje)
        datos_respuesta = serializer.data

        datos_respuesta['precio'] = precio_final_dinamico
        datos_respuesta['nota_api'] = nota_sistema

        return Response(datos_respuesta)

    except Viajes.DoesNotExist:
        return Response({'error': f'El viaje {nombre_limpio} no existe'}, status=404)