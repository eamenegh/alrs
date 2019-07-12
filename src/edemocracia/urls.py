from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from apps.accounts.api import api_root, UserListAPI
from apps.core.views import index
from django.views.generic.base import TemplateView

urlpatterns = [
    path('', index, name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('apps.accounts.urls')),
    path('sobre/', include('apps.about.urls')),
    path('api/v1/', api_root),
    path('api/v1/user/', UserListAPI.as_view(), name='user_list_api'),
    path('statistics/', TemplateView.as_view(template_name='statistics.html'), name='statistics'),
]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

if settings.WIKILEGIS_ENABLED:
    urlpatterns.append(path('wikilegis/', include('apps.wikilegis.urls')))

if settings.PAUTAS_ENABLED:
    urlpatterns.append(path('pautaparticipativa/',
                            include('apps.pautas.urls')))

if settings.AUDIENCIAS_ENABLED:
    urlpatterns.append(path('audiencias/', include('apps.audiencias.urls')))


if settings.DISCOURSE_ENABLED:
    urlpatterns.append(path('expressao/', include('apps.discourse.urls')))

admin.site.site_header = 'e-Democracia'
