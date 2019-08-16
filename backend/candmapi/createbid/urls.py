from django.urls import path

from . import views

urlpatterns = [
    path('nextIndentNumber', views.next_indentnumber, name='nextIndentNumber'),
]