from django.urls import path
from ninja import NinjaAPI
from .views import router

api = NinjaAPI()

api.add_router("/scheduler/", router)
from django.contrib import admin

urlpatterns = [
    path("admin/", admin.site.urls), 
    path("api/", api.urls),
]