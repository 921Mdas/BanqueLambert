from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [
    path('', views.family_members, name='home'),
    path('allowance/', views.parent_allowance, name='allowances'),
    path('investment/', views.fam_investments, name='investment'),
    path('allow/', views.familyview.as_view(), name='cbv allowance'),
    path('transactions/<int:pk>/', views.transactions.as_view(), name='transactions'),
    path('constructions/', views.upload, name='upload'),
    path('allowupdate/<int:pk>/', views.familyupdate.as_view(), name='cbv allowance update'),
    path('allowdelete/<int:pk>/', views.familydelete.as_view(), name='cbv allowance delete')
]
