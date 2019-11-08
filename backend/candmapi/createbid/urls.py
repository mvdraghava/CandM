from django.urls import path

from . import views

urlpatterns = [
    #path('nextIndentNumber', views.next_indentnumber, name='nextIndentNumber'),
    path('createot',views.create_ot),
    path('getopenbids',views.get_open_bids)
]