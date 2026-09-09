from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    EmployeeViewSet,
    TaskViewSet
)

router = DefaultRouter()

router.register('departments', DepartmentViewSet)
router.register('employees', EmployeeViewSet)
router.register('tasks', TaskViewSet)

urlpatterns = router.urls