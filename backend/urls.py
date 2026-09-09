"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from employees.views import dashboard, api_login, csrf_token, api_logout, api_current_user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', api_login, name='login'),
    path('csrf/', csrf_token, name='csrf'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', api_logout, name='logout'),
    path('current-user/', api_current_user, name='current-user'),
    path('api/', include('employees.urls')),
]
