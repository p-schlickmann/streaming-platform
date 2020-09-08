from django.urls import path, include

from . import views


urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name="create"),
    path('token/', views.CreateTokenView.as_view(), name="token"),
    path('me/', views.ManageUserView.as_view(), name="me"),
    path('streams/', views.StreamList.as_view(), name='streams'),
    path('mystream/', views.ManageStreamView.as_view(), name='mystream'),
]