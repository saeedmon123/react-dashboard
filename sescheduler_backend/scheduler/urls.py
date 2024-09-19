from django.urls import path
from ninja import NinjaAPI
from .views import router

api = NinjaAPI()

api.add_router("/scheduler/", router)

urlpatterns = [
    path("api/", api.urls),
]
