from django.urls import path
from .views import TaskListCreateView
from .views import TaskDetail

urlpatterns = [
    path("tasks/", TaskListCreateView.as_view(), name="task-list-create"),
    path("tasks/<int:pk>/", TaskDetail.as_view(), name="task-detail"),
]