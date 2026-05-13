from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from Autentificacion.views import RegisterView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/viajes/', include('Viajes.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
