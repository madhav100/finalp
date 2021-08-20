from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("display", views.display, name="display"),
    path("track", views.track, name="track"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("submit", views.submit, name="submit"),
    path("posts", views.posts, name="posts"),
    path("user/<str:username>", views.profile, name="profile"),
   
]
