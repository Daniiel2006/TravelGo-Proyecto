from django.urls import path
from .views import obtener_viaje_detalle

urlpatterns = [
    path('detalle/<str:viaje_id>/', obtener_viaje_detalle, name='viaje_detalle'),
]