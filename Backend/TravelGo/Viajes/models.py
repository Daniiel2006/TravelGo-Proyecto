from django.db import models

class Viajes(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='viajes/', null=True, blank=True)

    def __str__(self):
        return self.nombre