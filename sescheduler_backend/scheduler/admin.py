from django.contrib import admin
from .models import User,Course,Task
# Register your models here.
admin.site.register(User)
admin.site.register(Course)
admin.site.register(Task)