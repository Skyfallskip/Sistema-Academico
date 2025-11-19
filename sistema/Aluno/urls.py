from django.urls import path
from Aluno.views import *


urlpatterns = [
    path("inicio", home)
]