from django.urls import path

from . import views

urlpatterns = [
    #path('nextIndentNumber', views.next_indentnumber, name='nextIndentNumber'),
    path('createot',views.create_ot),
    path('getopenbids',views.get_open_bids),
    path('getfilenames',views.get_filenames),
    path('addvendor',views.add_vendor),
    path('getvendors',views.get_vendors),
    path('editvendor',views.edit_vendor),
    path('getemployees',views.getEmployees),
    path('getbiddetails',views.getBidDetails),
    path('prepareqr',views.prepareQR),
    path('editqr',views.editqr),
    path('getotNIT',views.getOtNIT),
    path('createlte',views.createlte),
    path('getltemNIT',views.prepare_lte_m_nit),
    path('editltecommittee',views.editltecommittee),
    path('issuelteNIT',views.issuelteNIT),
    path('datecorrigendum',views.datecorrigendum),
    path('prepareltetec',views.ltetecvetting),
    path('loapovetting',views.loapovetting)
]
