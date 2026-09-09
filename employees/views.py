from rest_framework import viewsets

from .models import Department, Employee, Task
from .serializers import (
    DepartmentSerializer,
    EmployeeSerializer,
    TaskSerializer
)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse


from django.shortcuts import render


@login_required
def dashboard(request):
    return render(request, "dashboard.html")

from django.contrib.auth import authenticate, login
from django.http import JsonResponse


def api_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return JsonResponse({
                "success": True,
                "message": "Login successful"
            })

        return JsonResponse({
            "success": False,
            "message": "Invalid username or password"
        }, status=401)

    return JsonResponse({
        "success": False,
        "message": "Only POST requests are allowed"
    }, status=405)

from django.middleware.csrf import get_token


def csrf_token(request):
    return JsonResponse({
        "csrfToken": get_token(request)
    })


from django.contrib.auth import logout


def api_logout(request):
    if request.method == "POST":
        logout(request)

        return JsonResponse({
            "success": True,
            "message": "Logout successful"
        })

    return JsonResponse({
        "success": False,
        "message": "Only POST requests are allowed"
    }, status=405)



def api_current_user(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "authenticated": True,
            "username": request.user.username
        })

    return JsonResponse({
        "authenticated": False,
        "message": "User is not logged in"
    }, status=401)